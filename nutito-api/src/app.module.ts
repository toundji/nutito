/* eslint-disable prettier/prettier */
import { UserService } from './user/services/user.service';
import { UserController } from './user/controllers/user.controller';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import config from '../ormconfig';


import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthorisationsGuard } from './user/guards/authorisation.guard';
import { JwtAuthGuard } from './user/guards/jwt-auth.guard';
import { AppExceptionFilter } from './utilities/helpers/exception-filter.helper';
import { AccountancyModule } from './accountancy/accountancy.module';
import { AppController } from './app.controller';
import ormconfig from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    AccountancyModule,
    MailModule
  ],
  exports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthorisationsGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
