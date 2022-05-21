import { IsNumber, IsString } from "class-validator";

export class UpdateAccountDto {
  
    @IsString()
    code ? : string;

    @IsNumber()
    amount ?: number;

    @IsNumber()
    amount_in ?: number;

    @IsNumber()
    amount_out ?: number;


}