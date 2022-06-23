/* eslint-disable prettier/prettier */
import { IsDateString, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { IsDate } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';
import { Operation } from './../entities/operation.entity';
export class CreateOperationDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDateString()
    @IsOptional()
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    type:OperationTypeEnum;

    @IsNumber()
    @IsPositive()
    company_id: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    operation_type_id: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    client_opration_type_id: number;

}