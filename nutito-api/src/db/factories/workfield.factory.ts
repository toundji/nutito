import { Factory, FactorizedAttrs } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { Workfield } from "../../accountancy/entities/workfield.entity";

export class WorkfieldFactory extends Factory<Workfield> {
    protected entity = Workfield;
    protected attrs: FactorizedAttrs<Workfield> = {
        name: faker.word.noun(),
        description: faker.lorem.lines(3),
    }
}