import { IsNotEmpty, IsString, IsPositive, IsEnum } from "class-validator";
import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';

export class CreateClientOperationDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsEnum(OperationTypeEnum)
    type: string;

    @IsNotEmpty()
    @IsPositive()
    creator_id: number;
}