import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { UserType } from '../../utilities/enums/user-type.enum';
export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(9)
    password: string;

    @IsEnum(UserType)
    user_type: string;
}