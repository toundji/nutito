import { Factory, FactorizedAttrs } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { User } from '../entities/user.entity';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';


export class UserFactory extends Factory<User> {
    protected entity = User;
    protected attrs: FactorizedAttrs<User> = {
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      ifu: faker.helpers.slugify(`ifu of company ${faker.company.companyName()}`),
      birth_date: faker.date.between('1980-01-01T00:00:00.000Z', '2018-01-01T00:00:00.000Z'),
      birth_place: faker.address.city(),
      address: faker.address.direction(),
      country: faker.address.country(),
      password: faker.word.verb(),
      user_type: faker.helpers.arrayElement(Object.values(UserTypeEnum)),
      verification_token: faker.hacker.ingverb(),
      active: faker.datatype.boolean()
    }
}