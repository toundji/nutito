/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";


export class UpdateClientOperationTypeDto{
    @IsString()
    name ? : string;

    @IsString()
    description ? : string;

    @IsString()
    OperationTypeEnum ? : string;

}