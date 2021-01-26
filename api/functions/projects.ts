import { 
  APIGatewayEvent,
  Context,
  APIGatewayProxyResult 
} from 'aws-lambda';
import { jsonSerializer } from '@lambda-middleware/json-serializer';

const API_URL = 'https://api.github.com/users/julleboi/repos';

export type Project = {
  name: string;
  description: string;
  language: string;
}

async function getProjects(body: any): Promise<Project[]> {
  return [
    {
      name: 'example-name',
      description: 'This is a description.',
      language: 'TypeScript'
    },
  ];
}

export const handler: (
  event: APIGatewayEvent,
  context: Context
) => Promise<APIGatewayProxyResult> = jsonSerializer()(getProjects);