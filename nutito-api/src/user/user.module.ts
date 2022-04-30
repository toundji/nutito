import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authstrategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './authstrategies/jwt.strategy';
import { Slugger } from 'src/utilities/helpers/slugger.helper';
import { AuthorisationFactory } from './services/authorisation.factory';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthorisationsGuard } from './guards/authorisation.guard';
import { SessionSerializer } from './serializers/session.serializer';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: configService.get<string>("JWT_TOKEN_EXPIRES_IN") }                   
            }),
            inject: [ConfigService],
        }),
        MailModule,
    ],
    exports: [
        UserService,
        AuthenticationService,
        Slugger,
        SessionSerializer,
        LocalStrategy,
        JwtStrategy,
        LocalAuthGuard,
        AuthorisationsGuard,
        AuthorisationFactory,
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        AuthenticationService,
        Slugger,
        SessionSerializer,
        LocalStrategy,
        JwtStrategy,
        JwtAuthGuard,
        LocalAuthGuard,
        AuthorisationsGuard,
        AuthorisationFactory,
    ],
})
export class UserModule {}
