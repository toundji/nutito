import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator'
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { createSwagger } from './utilities/api-docs';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: true });
  app.useGlobalPipes(
    new ValidationPipe({ 
      transform: true,
      disableErrorMessages: false,
      enableDebugMessages: true,
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors), 
    })
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await createSwagger(app).listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();

