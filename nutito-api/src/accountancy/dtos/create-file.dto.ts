/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsPositive } from 'class-validator';

export class CreateFileDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    mimetype: string;

    @IsNotEmpty()
    @IsPositive()
    entity_id: number;
    
    @IsNotEmpty()
    @IsPositive()
    operation_id: number;

    @IsNotEmpty()
    @IsPositive()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    slug: string;   
}