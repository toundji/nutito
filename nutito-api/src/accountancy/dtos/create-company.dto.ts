import { IsNotEmpty, IsString, IsPositive, IsArray } from "class-validator";

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