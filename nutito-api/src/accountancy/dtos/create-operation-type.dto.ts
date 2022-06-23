/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { OperationType } from '../entities/operation-type.entity';
import { IsNumber } from 'class-validator';
import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';
export class CreateOperationTypeDto{
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
    @IsNotEmpty()
    @IsString()
    type: OperationTypeEnum;

    @ApiProperty({required:true})
    @IsNumber({},{each:true})
    @IsPositive({each:true})
    workField_ids: number[];

}