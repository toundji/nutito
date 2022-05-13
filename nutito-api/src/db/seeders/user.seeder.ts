import { Seeder } from "@jorgebodega/typeorm-seeding";
import { UserFactory } from "../factories/user.factory";
import { Connection } from "typeorm";

export class UserSeeder extends Seeder {
    async run(connection: Connection) {
        await new UserFactory().createMany(60)
    }
}