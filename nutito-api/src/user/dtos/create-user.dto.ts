import { IsDate, IsDateString, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';
export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    ifu: string;

    
    birth_date: string;

    @IsString()
    birth_place: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @MinLength(8)
    @IsString()
    password: string;

    @IsEnum(UserTypeEnum)
    user_type: string;


}