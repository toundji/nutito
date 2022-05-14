import { Seeder } from "@jorgebodega/typeorm-seeding";
import { CompanyFactory } from "../factories/company.factory";
import { Connection } from "typeorm";

export class CompanySeeder extends Seeder {
    async run(connection: Connection) {
        await new CompanyFactory().createMany(60)
    }
}