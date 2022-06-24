import {IsString,IsPositive, IsOptional, IsArray } from "class-validator";

export class UpdateCompanyDto{

    @IsString()
    name ? : string;

    @IsString()
    description ? : string;

    @IsString()
    city ? : string;

    @IsString()
    address ? : string;

    @IsString()
    ifu ? : string;

    @IsString()
    rccm ? : string;

    // careers ? : Career[]

    @IsPositive()
    @IsOptional()
    company_category_id? : number
    
    @IsPositive({each:true})
    @IsOptional()
    companies_workfields? : number[]
}