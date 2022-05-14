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
        amount: Number(faker.finance.amount()),
        amount_in: Number(faker.finance.amount()),
        amount_out: Number(faker.finance.amount()),
        balance: Number(faker.finance.amount()),
        description: faker.lorem.lines(3),
        operation_type: new Subfactory(OperationTypeFactory),
        client_operation_type: new Subfactory(ClientOperationTypeFactory)
    }
}