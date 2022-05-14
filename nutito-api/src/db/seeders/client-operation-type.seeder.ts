import { Seeder } from "@jorgebodega/typeorm-seeding";
import { Connection } from "typeorm";
import { ClientOperationTypeFactory } from '../factories/client-operation-type.factory';

export class ClientOperationTypeSeeder extends Seeder {
    async run(connection: Connection) {
        await new ClientOperationTypeFactory().createMany(60)
    }
}