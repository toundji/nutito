/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateOperationTypeDto{
    @IsString()
    name ? : string;

    @IsString()
    description ? : string;

    @IsString()
    type ? : string;

}