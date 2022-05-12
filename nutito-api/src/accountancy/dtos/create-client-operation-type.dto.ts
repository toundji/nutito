/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString,IsPositive } from "class-validator";


export class CreateClientOperationDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    OperationTypeEnum: string;

    @IsPositive()
    operation: number;

}