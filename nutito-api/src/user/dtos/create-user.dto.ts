<<<<<<< HEAD
=======
/* eslint-disable prettier/prettier */
>>>>>>> 8e221fab06d8f4d8daab9d86e3e36eafd046b2d5
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';
export class CreateUserDto {

    @IsEmail()
    @IsOptional()
    email: string;

    @IsPhoneNumber()
    @IsOptional()
    phone: string;

    @IsOptional()
    ifu: string;
    
    @IsOptional()
    birth_date: string;

    @IsString()
    @IsOptional()
    birth_place: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    country: string;

    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserTypeEnum)
    @IsOptional()
    user_type: string;
    
}