import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { Career } from '../../accountancy/entities/career.entity';
import { AgentFactory } from "./agent.factory";
import { AgentRoleFactory } from "./agent-role.factory";
import { CompanyFactory } from "./company.factory";

export class CareerFactory extends Factory<Career> {
    protected entity = Career;
    protected attrs: FactorizedAttrs<Career> = {
        agent: new Subfactory(AgentFactory),
        company: new Subfactory(CompanyFactory),
        role: new Subfactory(AgentRoleFactory)
    }
}