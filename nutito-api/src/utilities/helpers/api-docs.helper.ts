import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import * as fs from 'fs';

export const SWAGGER_DOCS_PATH = '/api/v1/docs/swagger';
export const REDOCLI_DOCS_PATH = '/api/v1/docs/redoc';

const options = new DocumentBuilder()
  .setTitle('NUTITO SYSTEMS REST API')
  .setDescription('This is the api for NUTITO SYSTEMS')
  .setVersion('1.0')
  .addBearerAuth()
  .setContact("THE DEVCRAFT TEAM", "https://www.devcraft-team.com", "noreply@devcraft.com")
  .build();

const redocOptions: RedocOptions = {
  title: 'NUTITO SYSTEMS REST API',
  sortPropsAlphabetically: true,
  hideDownloadButton: false,
  hideHostname: false
};

export const createApiDocumentation = async (app: INestApplication): Promise<INestApplication> => {
  const document = SwaggerModule.createDocument(app, options)
  fs.writeFileSync("./openapi-schema.json", JSON.stringify(document));
  await SwaggerModule.setup(SWAGGER_DOCS_PATH, app, document);
  await RedocModule.setup(REDOCLI_DOCS_PATH, app, document, redocOptions);
  return app
}