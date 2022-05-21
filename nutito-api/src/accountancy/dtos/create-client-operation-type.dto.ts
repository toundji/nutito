/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsPositive, IsEnum } from "class-validator";
import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';

export class CreateClientOperationTypeDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsEnum(OperationTypeEnum)
    type: string;

    
}