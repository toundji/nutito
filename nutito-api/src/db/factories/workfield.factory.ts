import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { Operation } from "../../accountancy/entities/operation.entity";
import { OperationTypeFactory } from "./operation-type.factory";
import { ClientOperationTypeFactory } from './client-operation-type.factory';
import { Workfield } from "../../accountancy/entities/workfield.entity";

export class WorkfieldFactory extends Factory<Workfield> {
    protected entity = Workfield;
    protected attrs: FactorizedAttrs<Workfield> = {
        name: faker.word.noun(),
        description: faker.lorem.lines(3),
    }
}