import { Seeder } from "@jorgebodega/typeorm-seeding";
import { Connection } from "typeorm";
import { FileFactory } from '../factories/file.factory';

export class FileSeeder extends Seeder {
    async run(connection: Connection) {
        await new FileFactory().createMany(60)
    }
}