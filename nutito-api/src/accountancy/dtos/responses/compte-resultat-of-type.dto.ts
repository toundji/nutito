import { Company } from "src/accountancy/entities/company.entity";
import { OperationTypeEnum } from "src/utilities/enums/operation-type.enum";
import { ResultatCompteElement } from './resultat-de-compte-element.dto';



export class ResultatCompteOfType{
    from_date: Date;

    to_date: Date;

    type: OperationTypeEnum;

    company: Company;

    amount: number;
    elements:ResultatCompteElement[];
}