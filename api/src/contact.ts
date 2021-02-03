import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import cors from '@middy/http-cors';

import fetch from 'node-fetch';
import sanitizeHtml from 'sanitize-html';
import dedent from 'dedent';

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', maxLength: 50 },
        email: { type: 'string',  maxLength: 50, format: 'email' },
        message: { type: 'string', maxLength: 1000 }
      },
      required: ['name', 'email', 'message']
    }
  },
  required: ['body']
}

const cleanTags = (input: string) => sanitizeHtml(input, {allowedTags: []});

const createMessage = (name: string, email: string, message: string) => {
  const cleanName = cleanTags(name);
  const cleanEmail = cleanTags(email);
  const cleanMessage = cleanTags(message);

  return dedent`
    You have a new contact request from <b>${cleanName}</b>!

    <u>Message:</u>
    <pre>${cleanMessage}</pre>

    Email: ${cleanEmail}
  `;
}

const sendNotification = async (message: string) => {
  const url = `https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      chat_id: process.env.TG_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })
  });
  return res.status;
}

const notifier = async (event) => {
  const { name, email, message } = event.body;
  const notificationMessage = createMessage(name, email, message);
  const responseStatus = await sendNotification(notificationMessage);
  switch (responseStatus) {
    case 200:
      return {
        statusCode: 200,
        body: JSON.stringify({response: 'Message delivered!'})
      }
    default:
      return {
        statusCode: 500,
        body: JSON.stringify({response: 'Could not forward your message... Try again later'})
      }
  }
}

export const handler = middy(notifier)
  .use(httpJsonBodyParser())
  .use(validator({inputSchema}))
  .use(httpErrorHandler())
  .use(cors({origin: 'https://julle.dev', credentials: false}));