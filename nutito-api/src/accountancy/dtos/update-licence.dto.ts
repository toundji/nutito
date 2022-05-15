import { IsDate } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { IsPositive } from 'class-validator';

export class UpdateLicenceDto{
    @IsDate()
    expiryDate ? : Date;

    @IsNumber()
    amount ? : number;

   
    @IsString()
    conde ? : string;

    @IsString()
    payement_type ? : string;
    
    @IsPositive()
    transaction_id ? : number;

    @IsPositive()
    transaction_info ? : number;

    @IsPositive()
    company_id ? : number;

    

}