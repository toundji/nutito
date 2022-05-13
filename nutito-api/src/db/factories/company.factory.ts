import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { Company } from "../../accountancy/entities/company.entity";
import { CompanyCategoryFactory } from "./company-category.factory";
import { AccountFactory } from './account.factory';

export class CompanyFactory extends Factory<Company> {
    protected entity = Company;
    protected attrs: FactorizedAttrs<Company> = {
        name: faker.word.noun(),
        description: faker.lorem.lines(3),
        city: faker.address.cityName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.secondaryAddress(),
        rccm: faker.random.alphaNumeric(),
        ifu: faker.helpers.slugify(`ifu of company ${faker.company.companyName()}`),
        category: new Subfactory(CompanyCategoryFactory),
        account: new Subfactory(AccountFactory),
    }
}