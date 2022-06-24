/* eslint-disable prettier/prettier */
import { Company } from 'src/accountancy/entities/company.entity';
import { Operation } from 'src/accountancy/entities/operation.entity';

export class OperationRespoDto{

    from_date: Date;

    to_date: Date;

    company: Company;

    start_balence:number;

    end_balence:number;

    operations: Operation[];

}