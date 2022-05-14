import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { Licence } from "../../accountancy/entities/licence.entity";
import { PaymentTypeEnum } from '../../utilities/enums/payment-type.enum';
import { CompanyFactory } from "./company.factory";

export class LicenceFactory extends Factory<Licence> {
    protected entity = Licence;
    protected attrs: FactorizedAttrs<Licence> = {
        expiry_date: faker.date.future(),
        amount: Number(faker.finance.amount()),
        code: faker.random.alphaNumeric(),
        payment_type: faker.helpers.arrayElement(Object.values(PaymentTypeEnum)),
        transaction_id: faker.datatype.number(),
        transaction_info: faker.random.alphaNumeric(),
        company: new Subfactory(CompanyFactory),
    }
}