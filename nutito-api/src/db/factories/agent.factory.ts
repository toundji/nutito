import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { Agent } from "../../accountancy/entities/agent.entity";
import { AgentRoleFactory } from "./agent-role.factory";
import { CompanyFactory } from "./company.factory";
import { UserFactory } from './user.factory';

export class AgentFactory extends Factory<Agent> {
    protected entity = Agent;
    protected attrs: FactorizedAttrs<Agent> = {
        user: new Subfactory(UserFactory),
        company: new Subfactory(CompanyFactory),
        role: new Subfactory(AgentRoleFactory)
    }
}