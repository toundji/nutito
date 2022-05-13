import { Seeder } from "@jorgebodega/typeorm-seeding";
import { CareerFactory } from "../factories/career.facrory";
import { OperationTypeFactory } from "../factories/operation-type.factory";
import { Connection } from "typeorm";

export class OperationTypeSeeder extends Seeder {
    async run(connection: Connection) {
        await new OperationTypeFactory().createMany(60)
    }
}