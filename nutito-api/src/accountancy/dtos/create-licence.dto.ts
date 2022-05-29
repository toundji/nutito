import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsPositive } from 'class-validator';
import { PaymentTypeEnum } from 'src/utilities/enums/payment-type.enum';
import { LicenceTypeEnum } from '../../utilities/enums/licence-type.enum';

export class CreateLicenceDto{

    @IsOptional()
    @IsDate()
    expiryDate: Date;

    @IsNumber()
    @IsOptional()
    amount: number;

    @IsOptional()
    @IsString()
    code: string;

    @IsEnum(LicenceTypeEnum)
    licenceType: string;
    
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