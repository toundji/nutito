import { IsNotEmpty, IsString, IsPositive, IsArray, IsEmail, IsPhoneNumber, IsOptional } from "class-validator";

export class CreateCompanyDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    user_phone: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsString()
    @IsOptional()
    country: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsOptional()
    adress: string;

    @IsString()
    @IsOptional()
    ifu: string;

    @IsString()
    @IsOptional()
    rccm: string;

    @IsNotEmpty()
    @IsPositive()
    companyCategoryId: number;

    @IsNotEmpty()
    @IsArray()
    workfields: number[];
}