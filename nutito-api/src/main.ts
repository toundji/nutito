import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({ 
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors), 
    })
  );
  app.enableCors({ origin: true });
  const options = new DocumentBuilder()
    .setTitle('NUTITO SYSTEMS REST API')
    .setDescription('This is the api for NUTITO SYSTEMS')
    .setVersion('1.0')
    .setContact("THE DEVCRAFT TEAM", "https://www.devcraft-team.com", "noreply@devcraft.com")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync("./openapi-schema.json", JSON.stringify(document));
  await SwaggerModule.setup('/api/v1/docs', app, document);
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();

