import { Account } from '../../accountancy/entities/account.entity';
import { Factory, FactorizedAttrs, InstanceAttribute } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { uuid } from '../../utilities/helpers/functions.helper';

export class AccountFactory extends Factory<Account> {
    protected entity = Account
    protected attrs: FactorizedAttrs<Account> = {
      code: faker.helpers.slugify(uuid()),
      amount: Number(faker.finance.amount()),
      amount_in: new InstanceAttribute(
          (instance) => instance.amount
      ),
    }
}