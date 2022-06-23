/* eslint-disable prettier/prettier */
import { IsDateString,  IsNumber, IsOptional, IsPositive } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class OperationByPeriodeDto{

    @IsNotEmpty()
    @IsDateString()
    @IsOptional()
    from_date: Date;

    @IsNotEmpty()
    @IsDateString()
    @IsOptional()
    to_date: Date;

    @IsNumber()
    @IsPositive()
    company_id: number;

}