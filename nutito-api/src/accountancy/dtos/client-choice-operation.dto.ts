/* eslint-disable prettier/prettier */
import {IsPositive, IsNumber, ArrayNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ClientChoiceOperationTypeDto {


    @ApiProperty({required:true})
    @IsNumber({},{each:true})
    @IsPositive({each:true})
    @ArrayNotEmpty()
    operationType_ids: number[];

    @ApiProperty({required:true})
    @IsNumber()
    @IsPositive()
    company_id: number;

}