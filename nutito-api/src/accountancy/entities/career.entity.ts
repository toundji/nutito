/* eslint-disable prettier/prettier */
import { Company } from './company.entity';
import { JoinColumn, ManyToOne, Entity } from 'typeorm';
import { AgentRole } from './agent-role.entity';
import { Agent } from './agent.entity';
import { Audit } from './audit.entity';

@Entity()
export class Career extends Audit {
    [x: string]: Company;

    @ManyToOne(type => Agent, agent => agent.careers, { onDelete: "NO ACTION", nullable: false })
    @JoinColumn({ name: "agent_id" })
    agent: Agent;

    @ManyToOne(type => Company, company => company.careers, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "company_id" })
    company: Company;

    @ManyToOne(type => AgentRole, role => role.careers, { onDelete: "NO ACTION", nullable: false})
    @JoinColumn({ name: "agent_role_id" })
    role: AgentRole
    newCarrer: Company;
    // newCarrer: Company;
    // newCarrer: Company;

}