import { Seeder } from "@jorgebodega/typeorm-seeding";
import { Connection } from "typeorm";
import { CompanyCategoryFactory } from '../factories/company-category.factory';

export class CompanyCategorySeeder extends Seeder {
    async run(connection: Connection) {
        await new CompanyCategoryFactory().createMany(60)
    }
}