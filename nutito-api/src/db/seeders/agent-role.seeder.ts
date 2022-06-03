import { Seeder } from "@jorgebodega/typeorm-seeding";
import { Connection } from "typeorm";
import { AgentRoleFactory } from '../factories/agent-role.factory';

export class AgentRoleSeeder extends Seeder {
    async run(connection: Connection) {
        await new AgentRoleFactory().createMany(60)
    }
}