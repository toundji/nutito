import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';
import { Operation } from "../../accountancy/entities/operation.entity";
import { OperationTypeFactory } from "./operation-type.factory";
import { ClientOperationTypeFactory } from './client-operation-type.factory';

export class OperationFactory extends Factory<Operation> {
    protected entity = Operation;
    protected attrs: FactorizedAttrs<Operation> = {
        name: faker.word.noun(),
        date: faker.date.past(),
        amount: ((faker.finance.amount()) as any) as number,
        amount_in: ((faker.finance.amount()) as any) as number,
        amount_out: ((faker.finance.amount()) as any) as number,
        balance: ((faker.finance.amount()) as any) as number,
        description: faker.lorem.lines(3),
        operation_type: new Subfactory(OperationTypeFactory),
        client_operation_type: new Subfactory(ClientOperationTypeFactory)
    }
}