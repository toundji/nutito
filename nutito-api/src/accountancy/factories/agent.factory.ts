import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { Agent } from '../entities/agent.entity';
import { UserFactory } from "src/user/factory/user.factory";

export class AgentFactory extends Factory<Agent> {
    protected entity = Agent;
    protected attrs: FactorizedAttrs<Agent> = {
        user: new Subfactory(UserFactory),
    }
}