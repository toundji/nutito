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