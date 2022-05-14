import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { Licence } from "../../accountancy/entities/licence.entity";
import { PaymentTypeEnum } from '../../utilities/enums/payment-type.enum';
import { CompanyFactory } from "./company.factory";
import { OperationType } from '../../accountancy/entities/operation-type.entity';
import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';

export class OperationTypeFactory extends Factory<OperationType> {
    protected entity = OperationType;
    protected attrs: FactorizedAttrs<OperationType> = {
        name: faker.word.noun(),
        description: faker.lorem.lines(3),
        type: faker.helpers.arrayElement(Object.values(OperationTypeEnum))
    }
}