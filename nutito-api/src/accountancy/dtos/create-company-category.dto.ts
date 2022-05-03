/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCompanyCategoryDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    // companies: Company[]
}