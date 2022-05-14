import { Company } from './company.entity';
import { JoinColumn, ManyToOne, Entity } from 'typeorm';
import { AgentRole } from './agent-role.entity';
import { Agent } from './agent.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Career extends BaseEntity {

    @ManyToOne(type => Agent, agent => agent.careers, { onDelete: "NO ACTION", nullable: true })
    @JoinColumn({ name: "agent_id" })
    agent!: Agent;

    @ManyToOne(type => Company, company => company.careers, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "company_id" })
    company!: Company;

    @ManyToOne(type => AgentRole, role => role.careers, { onDelete: "NO ACTION", nullable: true })
    @JoinColumn({ name: "agent_role_id" })
    role!: AgentRole

}