import { Seeder } from "@jorgebodega/typeorm-seeding";
import { AgentFactory } from "../factories/agent.factory";
import { Connection } from "typeorm";

export class AgentSeeder extends Seeder {
    async run(connection: Connection) {
        await new AgentFactory().createMany(60)
    }
}