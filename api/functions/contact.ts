import { 
  APIGatewayProxyResult ,
  APIGatewayEvent,
  Context
} from 'aws-lambda';
import { SES } from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import { IsString, IsEmail } from 'class-validator';
import { compose } from '@lambda-middleware/compose';
import { classValidator } from '@lambda-middleware/class-validator';
import { errorHandler } from '@lambda-middleware/http-error-handler';
import { jsonSerializer } from '@lambda-middleware/json-serializer';
import { cors } from '@lambda-middleware/cors';

class ContactForm {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  message!: string;
}

const ses = new SES();

async function handleContactForm({
  body: { name, email, message },
}: {
  body: ContactForm;
}): Promise<{ response: string }> {
  const params: SendEmailRequest = {
    Destination: {
      ToAddresses: [ process.env.EMAIL ]
    },
    Message: {
      Body: {
        Text: { Data: `${message}\n\n- ${name} (${email})` }
      },
      Subject: { Data: `Message from ${name}` }
    },
    Source: process.env.EMAIL
  }
  try {
    await ses.sendEmail(params).promise();
    return { response: 'Sent.' };
  } catch (err) {
    console.error(err);
    return { response: 'Something went wrong...' };
  }
}

export const handler: (
  event: APIGatewayEvent,
  context: Context
) => Promise<APIGatewayProxyResult> = compose(
  cors(),
  errorHandler(),
  jsonSerializer(),
  classValidator({ bodyType: ContactForm })
)(handleContactForm);