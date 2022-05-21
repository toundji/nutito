import { IsNotEmpty, IsString, IsPositive, IsArray, IsEmail, IsPhoneNumber, IsOptional } from "class-validator";

export class CreateCompanyDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    country: string;

    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    adress: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    ifu: string;

    @IsNotEmpty()
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