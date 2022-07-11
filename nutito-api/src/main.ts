import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import {
  createApiDocumentation,
  REDOCLI_DOCS_PATH,
  SWAGGER_DOCS_PATH,
} from './utilities/helpers/api-docs.helper';
import * as basicAuth from 'express-basic-auth';
import 'dotenv/config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use(
  //   [
  //     SWAGGER_DOCS_PATH,
  //     REDOCLI_DOCS_PATH,
  //     `${SWAGGER_DOCS_PATH}-json`,
  //     `${REDOCLI_DOCS_PATH}-json`,
  //   ],
  //   basicAuth({
  //     challenge: true,
  //     users: {
  //       [process.env.OPEN_API_USERNAME]: process.env.OPEN_API_PASSWORD,
  //     },
  //   }),
  // );
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    index: false,
    prefix: '/public',
  });
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(errors),
    }),
  );
  (await createApiDocumentation(app)).listen(
    process.env.PORT || 3000,
    '0.0.0.0',
  );
}
bootstrap();
