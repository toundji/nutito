/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsPositive, IsNumber } from 'class-validator';

export class CreateFileDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    entity_id: number;
}