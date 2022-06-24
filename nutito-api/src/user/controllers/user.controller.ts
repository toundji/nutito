import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { MailService } from 'src/mail/mail.service';
import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { User } from '../entities/user.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthenticateUserDto } from '../dtos/authenticate-user.dto';
import { DoesNotRequireAuthentication } from '../../utilities/decorators/does-not-require-authentication.decorator';
import { DoesNotRequireAuthorisations } from '../../utilities/decorators/does-not-require-authorisations.decorator';
import { SigninResponseDto } from '../dtos/signin-response.dto';
import { SignupResponseDto } from '../dtos/signup-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { Agent } from '../../accountancy/entities/agent.entity';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { AuthenticationService } from '../services/authentication.service';


@ApiTags('auth')
@Controller('users')
export class UserController {

  constructor(
    private readonly userservice: UserService,
    private readonly authenticationservice: AuthenticationService
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
    //this.mailservice.sendMailConfirmation(user, token);
    return {"message": "User Successfully Created"};
  }

  @Post('auth/signin')
  @DoesNotRequireAuthentication()
  @DoesNotRequireAuthorisations()
  @UseGuards(LocalAuthGuard)
  async signin(@Body() body: AuthenticateUserDto, @Request() request): Promise<SigninResponseDto> {
    return this.authenticationservice.signin(request.user);
  }

  @Post('auth/password/reset')
  @DoesNotRequireAuthentication()
  @DoesNotRequireAuthorisations()
  async resetPassword(@Body() body: ResetPasswordDto, @Request() request): Promise<any> {
    return this.authenticationservice.resetPassword(body)
  }

  @Post('auth/mail/check')
  @DoesNotRequireAuthentication()
  @DoesNotRequireAuthorisations()
  async verifyEmail(@Body() body: VerifyEmailDto) {
    const user = await this.userservice.findOneByEmail(body.user.email);
    if (user && user.verification_token === body.token) {
      this.userservice.set_user_activity(user, true);
      return { success: true, message: "Email confirmé avec succès" }
    }
  }

  @Get('auth/check-email-existence/:email')
  @DoesNotRequireAuthentication()
  @DoesNotRequireAuthorisations()
  async checkIfEmailExists(@Param('email') email: string): Promise<any> {
    return await this.userservice.checkUserExistenceByEmail(email);
  }

  @Get('auth/check-phone-existence/:phone')
  @DoesNotRequireAuthentication()
  @DoesNotRequireAuthorisations()
  async checkIfPhoneExists(@Param('phone') phone: string): Promise<any> {
    return await this.userservice.checkUserExistenceByPhone(phone);
  }

  @Get(':phone/agents')
  async getUserAgents(@Param('phone') phone: string): Promise<Agent[]> {
    return await this.userservice.getUserAgents(phone);
  }

}
