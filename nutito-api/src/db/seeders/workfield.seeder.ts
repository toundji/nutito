import { Seeder } from "@jorgebodega/typeorm-seeding";
import { Connection } from "typeorm";
import { WorkfieldFactory } from '../factories/workfield.factory';

export class WorkfieldSeeder extends Seeder {
    async run(connection: Connection) {
        await new WorkfieldFactory().createMany(60)
    }
}