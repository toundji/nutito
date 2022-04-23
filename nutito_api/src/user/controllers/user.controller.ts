import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { MailService } from 'src/mail/mail.service';
import { AuthenticationService } from '../services/authentication.service';
import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { User } from '../entities/user.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthenticateUserDto } from '../dtos/authenticate-user.dto';
import { DoesNotRequireAuthentication } from '../../utilities/decorators/does-not-require-authentication.decorator';
import { DoesNotRequireAuthorisations } from 'src/utilities/decorators/does-not-require-authorisations.decorator';
import { SigninResponseDto } from '../dtos/signin-response.dto';
import { SignupResponseDto } from '../dtos/signup-response.dto';


@Controller('users')
export class UserController {

  constructor(
    private readonly userservice: UserService,
    private readonly authenticationservice: AuthenticationService,
    private mailservice: MailService
  ) { }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userservice.findAll();
  }

  @Post('auth/signup')
  @DoesNotRequireAuthentication()
  @DoesNotRequireAuthorisations()
  async signup(@Body() body: CreateUserDto): Promise<SignupResponseDto> {
    const user = await this.userservice.create(body);
    const token = Math.floor(10000000 + Math.random() * 90000000).toString();
    user.verification_token = token;
    await this.userservice.set_verification_token(user, token);
    return {"message": "User Successfully Created"};
  }

  @Post('auth/signin')
  @DoesNotRequireAuthentication()
  @DoesNotRequireAuthorisations()
  @UseGuards(LocalAuthGuard)
  async signin(@Request() request): Promise<SigninResponseDto> {
    return this.authenticationservice.login(request.user);
  }

  @Post('auth/mail/check')
  @DoesNotRequireAuthentication()
  @DoesNotRequireAuthorisations()
  async verify_email(@Body() body: VerifyEmailDto) {
    const user = await this.userservice.findOneByEmail(body.user.email);
    if (user && user.verification_token === body.token) {
      this.userservice.set_user_activity(user, true);
      return { success: true, message: "Email confirmé avec succès" }
    }
  }

}
