import { Seeder } from "@jorgebodega/typeorm-seeding";
import { CareerFactory } from "../factories/career.facrory";
import { Connection } from "typeorm";

export class CareerSeeder extends Seeder {
    async run(connection: Connection) {
        await new CareerFactory().createMany(60)
    }
}