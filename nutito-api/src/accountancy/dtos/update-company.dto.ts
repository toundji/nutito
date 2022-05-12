/* eslint-disable prettier/prettier */
import {IsString,IsPositive } from "class-validator";

export class UpdateCompanyDto{
    
    @IsString()
    name ? : string;

    
    @IsString()
    description ? : string;

    
    @IsString()
    city ? : string;

    
    @IsString()
    adress ? : string;

    
    @IsString()
    ifu ? : string;

    
    @IsString()
    rccm ? : string;

    // careers ? : Career[]
    
    @IsPositive()
    company_category_id ? : number

    

    
    @IsPositive()
    companies_workfields ? : number
}