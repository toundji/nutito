<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString,IsPositive } from "class-validator";


export class CreateClientOperationDto{
=======
import { IsNotEmpty, IsString, IsPositive, IsEnum } from "class-validator";
import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';

export class CreateClientOperationDto {

>>>>>>> dev
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

<<<<<<< HEAD
    @IsNotEmpty()
    @IsString()
    OperationTypeEnum: string;

    @IsPositive()
    operation: number;

=======
    @IsEnum(OperationTypeEnum)
    type: string;

    @IsNotEmpty()
    @IsPositive()
    creator_id: number;
>>>>>>> dev
}