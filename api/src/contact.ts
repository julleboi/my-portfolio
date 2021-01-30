import { 
  APIGatewayProxyResult,
  APIGatewayEvent,
  Context
} from 'aws-lambda';
import { SES } from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import { IsString, MaxLength, IsEmail } from 'class-validator';
import { compose } from '@lambda-middleware/compose';
import { classValidator } from '@lambda-middleware/class-validator';
import { errorHandler } from '@lambda-middleware/http-error-handler';
import { jsonSerializer } from '@lambda-middleware/json-serializer';
import { cors } from '@lambda-middleware/cors';

const ses = new SES();

class ContactForm {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsString()
  @MaxLength(100)
  @IsEmail()
  email!: string;

  @IsString()
  @MaxLength(1000)
  message!: string;
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

async function handleContactForm({
  body: { name, email, message },
}: {
  body: ContactForm;
}): Promise<{ response: string }> {
  const req = createEmail(name, email, message);
  await ses.sendEmail(req).promise();
  return { response: 'Sent.' };
}

export const handler: (
  event: APIGatewayEvent,
  context: Context
) => Promise<APIGatewayProxyResult> = compose(
  cors(),
  errorHandler(),
  jsonSerializer(),
  classValidator({
    bodyType: ContactForm
  })
)(handleContactForm);