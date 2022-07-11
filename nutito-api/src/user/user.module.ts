import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authstrategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './authstrategies/jwt.strategy';
import { AuthorisationFactory } from './services/authorisation.factory';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthorisationsGuard } from './guards/authorisation.guard';
import { SessionSerializer } from './serializers/session.serializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FileService } from 'src/accountancy/services/file.service';
import { Fichier } from 'src/accountancy/entities/fichier.entity';
import { CompanyService } from 'src/accountancy/services/company.service';
import { OperationService } from '../accountancy/services/operation.service';
import { Company } from '../accountancy/entities/company.entity';
import { AccountancyModule } from '../accountancy/accountancy.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Fichier,
            Company
        ]),
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: configService.get<string>("JWT_TOKEN_EXPIRES_IN") }                   
            }),
            inject: [ConfigService],
        }),
        MailModule
    ],
    exports: [
        UserService,
        AuthenticationService,
        SessionSerializer,
        LocalStrategy,
        JwtStrategy,
        LocalAuthGuard,
        AuthorisationsGuard,
        AuthorisationFactory
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        AuthenticationService,
        SessionSerializer,
        LocalStrategy,
        JwtStrategy,
        JwtAuthGuard,
        LocalAuthGuard,
        AuthorisationsGuard,
        AuthorisationFactory,
        AuthenticationService
    ],
})
export class UserModule {}
