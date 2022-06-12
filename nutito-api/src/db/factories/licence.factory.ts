import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { Licence } from "../../accountancy/entities/licence.entity";
import { PaymentTypeEnum } from '../../utilities/enums/payment-type.enum';
import { CompanyFactory } from "./company.factory";
import { LicenceTypeEnum } from '../../utilities/enums/licence-type.enum';

export class LicenceFactory extends Factory<Licence> {
    protected entity = Licence;
    protected attrs: FactorizedAttrs<Licence> = {
        expiryDate: faker.date.future(),
        amount: Number(faker.finance.amount()),
        code: faker.random.alphaNumeric(),
        paymentType: faker.helpers.arrayElement(Object.values(PaymentTypeEnum)),
        transactionId: faker.datatype.string(),
        transactionInfo: faker.random.alphaNumeric(),
        company: new Subfactory(CompanyFactory),
    }
}