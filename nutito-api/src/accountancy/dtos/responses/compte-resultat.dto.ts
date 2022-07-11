import { Company } from "src/accountancy/entities/company.entity";
import { OperationTypeEnum } from "src/utilities/enums/operation-type.enum";
import { ResultatCompteElement } from './resultat-de-compte-element.dto';



export class ResultatCompte{
    from_date: Date;
    to_date: Date;

    company: Company;

    amount_in:number;
    amount_out:number;
    
    elements:ResultatCompteElement[];
}