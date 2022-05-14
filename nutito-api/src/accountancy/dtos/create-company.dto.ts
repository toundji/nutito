<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsString,IsPositive } from "class-validator";

export class CreateCompanyDto{
=======
import { IsNotEmpty, IsString, IsPositive, IsArray, IsEmail, IsPhoneNumber } from "class-validator";

export class CreateCompanyDto {
    
>>>>>>> dev
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
<<<<<<< HEAD
=======
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
>>>>>>> dev
    @IsString()
    adress: string;

    @IsNotEmpty()
    @IsString()
    ifu: string;

    @IsNotEmpty()
    @IsString()
    rccm: string;

<<<<<<< HEAD
    
=======
>>>>>>> dev
    @IsNotEmpty()
    @IsPositive()
    company_category_id: number;

    @IsNotEmpty()
<<<<<<< HEAD
    @IsPositive()
    companies_workfields: number;

    @IsNotEmpty()
    @IsString()
    slug: string;
=======
    @IsArray()
    workfields: number[];
>>>>>>> dev
}