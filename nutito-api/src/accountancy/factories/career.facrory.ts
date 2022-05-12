import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { Career } from '../entities/career.entity';
import { AgentFactory } from "./agent.factory";
import { AgentRoleFactory } from "./agent-role.factory";

export class CareerFactory extends Factory<Career> {
    protected entity = Career;
    protected attrs: FactorizedAttrs<Career> = {
        agent: new Subfactory(AgentFactory),
        company: new Subfactory(CompanyFactory),
        role: new Subfactory(AgentRoleFactory)
    }
}