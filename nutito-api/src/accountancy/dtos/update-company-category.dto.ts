/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
export class UpdaateCompanyCategoryDto{
    @IsString()
    name: string;

    @IsString()
    description: string;

    // companies: Company[]
}