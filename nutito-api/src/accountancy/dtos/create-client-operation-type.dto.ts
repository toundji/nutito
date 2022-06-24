/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsPositive, IsEnum, IsNumber } from "class-validator";
import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';
import { IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateClientOperationTypeDto {

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty()

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({required:true})
    @IsEnum(OperationTypeEnum)
    type: OperationTypeEnum;

    @ApiProperty({required:true})
    @IsNumber()
    @IsPositive()
    company_id: number;

    
}