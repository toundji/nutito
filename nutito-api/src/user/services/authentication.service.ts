import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userservice: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token: access_token };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userservice.findOneByEmail(email);
    const doesMatch = await bcrypt.compare(password, user.password);
    if (doesMatch) {
      const { password, verification_token, ...rest } = user;
      return rest
    }
    return null;
  }
}
