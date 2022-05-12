import { Factory, FactorizedAttrs } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { CompanyCategory } from "../entities/company-category.entity";
import { Company } from "../entities/company.entity";

export class CompanyFactory extends Factory<Company> {
    protected entity = Company;
    protected attrs: FactorizedAttrs<Company> = {
        name: faker.word.noun(),
        description: faker.lorem.lines(3),
        ifu: faker.helpers.slugify(`ifu of company ${faker.company.companyName()}`),
    }
}