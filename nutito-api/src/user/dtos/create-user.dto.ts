/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';
export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsOptional()
    phone: string;

    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserTypeEnum)
    user_type: string;


}