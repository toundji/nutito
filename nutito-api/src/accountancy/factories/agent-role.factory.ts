import { Factory, FactorizedAttrs } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { AgentRole } from '../entities/agent-role.entity';

export class AgentRoleFactory extends Factory<AgentRole> {
    protected entity = AgentRole;
    protected attrs: FactorizedAttrs<AgentRole> = {
      name: faker.helpers.arrayElement(["AGENT", "COMPTABLE", "SECRÉTAIRE", "DIRECTEUR TECHNIQUE"]),
      description: faker.lorem.lines(3),
    }
}