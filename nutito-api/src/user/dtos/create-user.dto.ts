/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';
export class CreateUserDto {

    @IsOptional()
    firstname?: string;

    @IsOptional()
    lastname?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    phone: string;

    @IsOptional()
    ifu?: string;
    
    @IsOptional()
    birth_date?: string;

    @IsString()
    @IsOptional()
    birth_place?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserTypeEnum)
    @IsOptional()
    user_type?: string;
    
}