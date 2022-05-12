import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { AgentRoleFactory } from "./agent-role.factory";
import { ClientOperationType } from '../entities/client-operation-type.entity';
import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';

export class ClientOperationTypeFactory extends Factory<ClientOperationType> {
    protected entity = ClientOperationType;
    protected attrs: FactorizedAttrs<ClientOperationType> = {
        name: faker.word.noun(),
        description: faker.lorem.lines(3),
        type: faker.helpers.arrayElement(Object.values(OperationTypeEnum))
    }
}