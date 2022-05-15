import { IsNumber } from 'class-validator';
import { IsDate } from 'class-validator';
import { IsString } from 'class-validator';
export class UpdateOperationDto{
    @IsString()
    name ? : string;

    @IsDate()
    date ? : Date;

    @IsNumber()
    amount_id ? : number;

    @IsNumber()
    balance ? : number;

    @IsString()
    description ? : string;

    @IsNumber()
    operation_type_id ? : number;

    @IsNumber()
    client_opration_type_id ? : number;

}