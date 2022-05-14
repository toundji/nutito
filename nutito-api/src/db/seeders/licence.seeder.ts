import { Seeder } from "@jorgebodega/typeorm-seeding";
import { LicenceFactory } from "../factories/licence.factory";
import { Connection } from "typeorm";

export class LicenceSeeder extends Seeder {
    async run(connection: Connection) {
        await new LicenceFactory().createMany(60)
    }
}