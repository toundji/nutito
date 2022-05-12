/* eslint-disable prettier/prettier */
import { IsDate } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsPositive } from 'class-validator';

export class CreateLicenceDto{
    @IsNotEmpty()
    @IsDate()
    expiryDate: Date;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    conde: string;

    @IsNotEmpty()
    @IsString()
    payement_type: string;
    
    @IsNotEmpty()
    @IsPositive()
    transaction_id: number;

    @IsNotEmpty()
    @IsPositive()
    transaction_info: number;

    @IsNotEmpty()
    @IsPositive()
    company_id: number;


}