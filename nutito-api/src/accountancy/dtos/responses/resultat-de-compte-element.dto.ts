
import { OperationType } from 'src/accountancy/entities/operation-type.entity';
import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';
import { ClientOperationType } from '../../entities/client-operation-type.entity';

export class ResultatCompteElement{
    amount:number;
    type: OperationTypeEnum;
    operationType: OperationType;
    clientOperationType:ClientOperationType;
}