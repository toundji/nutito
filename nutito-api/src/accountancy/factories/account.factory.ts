import { Account } from '../entities/account.entity';
import { Factory, FactorizedAttrs, InstanceAttribute } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"

export class AccountFactory extends Factory<Account> {
    protected entity = Account
    protected attrs: FactorizedAttrs<Account> = {
      code: faker.unique.name,
      amount: ((faker.finance.amount()) as any) as number,
      amount_in: new InstanceAttribute(
          (instance) => instance.amount
      ),
    }
}