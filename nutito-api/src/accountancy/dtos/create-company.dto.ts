import { IsNotEmpty, IsString, IsPositive, IsArray, IsEmail, IsPhoneNumber } from "class-validator";

export class CreateCompanyDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsString()
    adress: string;

    @IsNotEmpty()
    @IsString()
    ifu: string;

    @IsNotEmpty()
    @IsString()
    rccm: string;

    @IsNotEmpty()
    @IsPositive()
    company_category_id: number;

    @IsNotEmpty()
    @IsArray()
    workfields: number[];
}