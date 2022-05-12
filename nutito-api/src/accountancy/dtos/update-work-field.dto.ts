/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateWorkFieldDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;


}