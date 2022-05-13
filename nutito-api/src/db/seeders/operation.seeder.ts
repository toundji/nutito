import { Seeder } from "@jorgebodega/typeorm-seeding";
import { OperationTypeFactory } from "../factories/operation-type.factory";
import { OperationFactory } from "../factories/operation.factory";
import { Connection } from "typeorm";

export class OperationSeeder extends Seeder {
    async run(connection: Connection) {
        await new OperationFactory().createMany(60)
    }
}