import { SES } from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';

const ses = new SES();

const inputSchema = {
  type: 'object',
  properties: {
    name: { 
      type: 'string', 
      maxLength: 10
    },
    email: { 
      type: 'string',
      maxLength: 100,
      format: 'email'
    },
    message: {
      type: 'string',
      maxLength: 1000
    }
  }
}

const createEmail = (name: string, email: string, message: string): SendEmailRequest => {
  return {
    Destination: { ToAddresses: [ process.env.EMAIL ] },
    Message: {
      Body: {
        Html: { 
          Data: `
            <q>${message}</q>
            <br />
            <address>
              Sent by ${name}.
              Email: <a href="mailto:${email}">${email}</a>
            </address>
            `
        },
        Text: {
          Data: `${message}\n\nSent by ${name}.\nEmail: ${email}`
        }
      },
      Subject: { 
        Data: `Contact request from ${name}`
      }
    },
    Source: process.env.EMAIL
  }
}

const processRequest = async (event) => {
  const { name, email, message } = event.body;
  const req = createEmail(name, email, message);
  await ses.sendEmail(req).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({response: 'Thank you!'})
  }
}

export const handler = middy(processRequest)
  .use(httpJsonBodyParser())
  .use(validator({inputSchema}))
  .use(httpErrorHandler());