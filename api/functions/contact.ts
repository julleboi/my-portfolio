import { 
  APIGatewayProxyResult ,
  APIGatewayEvent,
  Context
} from 'aws-lambda';
import { IsString, IsEmail } from 'class-validator';
import { compose } from '@lambda-middleware/compose';
import { classValidator } from '@lambda-middleware/class-validator';
import { errorHandler } from '@lambda-middleware/http-error-handler';
import { jsonSerializer } from '@lambda-middleware/json-serializer';

class ContactForm {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  message!: string;
}

async function handleContactForm({
  body: { name, email, message },
}: {
  body: ContactForm;
}): Promise<{ response: string }> {
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
  return { response: 'I will get back to you soon! :)' };
}

export const handler: (
  event: APIGatewayEvent,
  context: Context
) => Promise<APIGatewayProxyResult> = compose(
  errorHandler(),
  jsonSerializer(),
  classValidator({ bodyType: ContactForm })
)(handleContactForm);