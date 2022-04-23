import { CreateUserDto } from './create-user.dto';

export class VerifyEmailDto {
    user: CreateUserDto;
    token: string;
}