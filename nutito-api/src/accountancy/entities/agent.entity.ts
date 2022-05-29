import { Company } from './company.entity';
import { JoinColumn, ManyToOne, Entity, OneToOne, Column } from 'typeorm';
import { AgentRole } from './agent-role.entity';
import { BaseEntity } from './base.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Agent extends BaseEntity {

    @ManyToOne(type => User, user => user.agents, { onDelete: "NO ACTION" })
    @JoinColumn({ name: "agent_id" })
    user!: User;

    @ManyToOne(type => Company, company => company.agents, { onDelete: "CASCADE" })
    @JoinColumn({ name: "company_id" })
    company!: Company;

    @OneToOne(type => AgentRole)
    @JoinColumn({ name: "agent_role_id" })
    role!: AgentRole;

    @Column("simple-array", { nullable: true })
    abilities: string[];

}