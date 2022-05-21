import { Factory, FactorizedAttrs, Subfactory } from '@jorgebodega/typeorm-seeding';
import { faker } from "@faker-js/faker"
import { User } from '../../user/entities/user.entity';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';
import { uuid } from "../../utilities/helpers/functions.helper";
import { FileFactory } from './file.factory';


export class UserFactory extends Factory<User> {
    protected entity = User;
    protected attrs: FactorizedAttrs<User> = {
      email: faker.unique(faker.internet.email),
      phone: faker.unique(faker.phone.phoneNumber),
      ifu: faker.unique(faker.company.companyName),
      birth_date: faker.date.between('1980-01-01T00:00:00.000Z', '2018-01-01T00:00:00.000Z'),
      birth_place: faker.address.city(),
      address: faker.address.direction(),
      country: faker.address.country(),
      password: faker.word.verb(),
      user_type: faker.helpers.arrayElement(Object.values(UserTypeEnum)),
      verification_token: faker.hacker.ingverb(),
      active: faker.datatype.boolean(),
      profile_picture: new Subfactory(FileFactory)
    }
}