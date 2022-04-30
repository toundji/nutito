import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';
export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

    @IsEnum(UserTypeEnum)
    user_type: string;
}