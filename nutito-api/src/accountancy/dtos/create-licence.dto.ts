import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsPositive } from 'class-validator';
import { PaymentTypeEnum } from 'src/utilities/enums/payment-type.enum';
import { LicenceTypeEnum } from '../../utilities/enums/licence-type.enum';

export class CreateLicenceDto{

    @IsNumber()
    @IsNotEmpty()
    monthsNumber: number;
    
    @IsOptional()
    @IsEnum(PaymentTypeEnum)
    paymentType: string;
    
    @IsOptional()
    @IsPositive()
    transactionId: number;

    @IsOptional()
    @IsPositive()
    transactionInfo: number;

    @IsNotEmpty()
    @IsPositive()
    companyId: number;
}