import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateAccountDto {

    @IsNotEmpty()
    @IsString()
    code : string;

    @IsNumber()
    @IsNotEmpty()
    amount : number;

    @IsNumber()
    @IsNotEmpty()
    amount_in : number;

    @IsNumber()
    @IsNotEmpty()
    amount_out : number;

}