/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsString,IsPositive } from "class-validator";

export class CreateCompanyDto{
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
    @IsString()
    adress: string;

    @IsNotEmpty()
    @IsString()
    ifu: string;

    @IsNotEmpty()
    @IsString()
    rccm: string;

    // careers: Career[]
    @IsNotEmpty()
    @IsPositive()
    company_category_id: number

    // licences: Licence[];


    // account: Account;

    @IsNotEmpty()
    @IsPositive()
    companies_workfields: number
}