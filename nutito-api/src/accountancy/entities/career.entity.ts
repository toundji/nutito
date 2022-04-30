import { Company } from './company.entity';
import { User } from '../../user/entities/user.entity';
import { Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { AgentRole } from './agent-role.entity';
import { Agent } from './agent.entity';
import { Audit } from './audit.entity';

@Entity()
export class Career extends Audit {

    @ManyToOne(type => Agent, agent => agent.careers, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "agent_id" })
    agent: Agent;

    @ManyToOne(type => Company, company => company.careers, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "company_id" })
    company: Company;

    @ManyToOne(type => AgentRole, role => role.careers, { onDelete: "CASCADE", nullable: false})
    role: AgentRole

}