import { Factory, FactorizedAttrs } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { CompanyCategory } from "../entities/company-category.entity";

export class CompanyCategoryFactory extends Factory<CompanyCategory> {
    protected entity = CompanyCategory;
    protected attrs: FactorizedAttrs<CompanyCategory> = {
        name: faker.word.noun(),
        description: faker.lorem.lines(3)
    }
}