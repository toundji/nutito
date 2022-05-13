import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { Agent } from '../../accountancy/entities/agent.entity';
import { UserFactory } from "./user.factory";

export class AgentFactory extends Factory<Agent> {
    protected entity = Agent;
    protected attrs: FactorizedAttrs<Agent> = {
        user: new Subfactory(UserFactory),
    }
}