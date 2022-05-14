<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsPositive } from 'class-validator';

export class CreateFileDto{
=======
import { IsNotEmpty, IsString, IsPositive, IsNumber } from 'class-validator';

export class CreateFileDto {
>>>>>>> dev
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
<<<<<<< HEAD
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
=======
    @IsNumber()
    @IsPositive()
    entity_id: string;

    @IsNumber()
    @IsPositive()
    operation_id: string;

    @IsNumber()
    @IsPositive()
    user_id: string;

>>>>>>> dev
}