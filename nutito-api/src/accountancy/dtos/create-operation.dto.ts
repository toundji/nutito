/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';
import { IsDate } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateOperationDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    amount_id: number;

    @IsNotEmpty()
    @IsNumber()
    balance: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    operation_type_id: number;

    @IsNotEmpty()
    @IsNumber()
    client_opration_type_id: number;

}