import { IsString, IsEnum, IsOptional } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsPositive } from 'class-validator';
import { PaymentTypeEnum } from 'src/utilities/enums/payment-type.enum';

export class CreateLicenceDto{

    @IsNumber()
    @IsNotEmpty()
    monthsNumber: number;
    
    @IsOptional()
    @IsEnum(PaymentTypeEnum)
    paymentType: string;
    
    @IsOptional()
    @IsString()
    transactionId: string;

    @IsOptional()
    @IsString()
    transactionInfo: string;

    @IsNotEmpty()
    @IsPositive()
    companyId: number;
}