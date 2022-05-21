import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { SigninResponseDto } from '../dtos/signin-response.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userservice: UserService,
    private jwtService: JwtService,
  ) {}

  async signin(user: User): Promise<SigninResponseDto> {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    const { password, ...rest } = user;
    return { 
      status: "success",
      access_token: access_token,
      user_data: rest,
      type: "Bearer"
    };
  }

  async validateUserWithEmail(email: string, password: string) {

    let user: User;
    
    let invalidCredentialsMessage = "Invalid credentials !"

    try {
      user = await this.userservice.findOneByEmail(email);
    } catch(error) {
      throw new BadRequestException(invalidCredentialsMessage);
    }

    const doesMatch = await bcrypt.compare(password, user.password);

    if (doesMatch) {
      const {id, password, verification_token, ...rest } = user;
      return rest;
    } else {
      throw new BadRequestException(invalidCredentialsMessage);
    }
  }

  async validateUserWithPhone(phone: string, password: string) {

    let user: User;
    let invalidCredentialsMessage = "Invalid credentials !"
    try {
      user = await this.userservice.findOneByPhone(phone);
    } catch(error) {
      throw new BadRequestException(invalidCredentialsMessage);
    }

    const doesMatch = await bcrypt.compare(password, user.password);

    if (doesMatch) {
      const {id, password, verification_token, ...rest } = user;
      return rest;
    } else {
      throw new BadRequestException(invalidCredentialsMessage);
    }
  }
}


