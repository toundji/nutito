import {IsString,IsPositive, IsOptional, IsArray } from "class-validator";

export class UpdateCompanyDto{

    @IsString()
    name ? : string;

    @IsString()
    @IsOptional()
    description ? : string;

    @IsString()
    @IsOptional()
    city ? : string;

    @IsString()
    @IsOptional()
    address ? : string;

    @IsString()
    @IsOptional()
    ifu ? : string;

    @IsString()
    @IsOptional()
    rccm ? : string;

    // careers ? : Career[]

    @IsPositive()
    @IsOptional()
    company_category_id? : number
    
    @IsPositive({each:true})
    @IsOptional()
    companies_workfields? : number[]
}