/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
export class UpdateCompanyCategoryDto{
    @IsString()
    name ? : string;

    @IsString()
    description ? : string;

}