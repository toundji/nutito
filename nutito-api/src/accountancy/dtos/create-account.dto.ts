<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, } from "class-validator";

export class createAccountDto{
=======
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateAccountDto {

>>>>>>> dev
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