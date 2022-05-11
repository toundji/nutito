import { Company } from './company.entity';
import { JoinColumn, ManyToOne, Entity, BeforeInsert } from 'typeorm';
import { AgentRole } from './agent-role.entity';
import { Agent } from './agent.entity';
import { BaseEntity } from './base.entity';
import { sluggify } from 'src/utilities/helpers/functions.helper';

@Entity()
export class Career extends BaseEntity {

    @ManyToOne(type => Agent, agent => agent.careers, { onDelete: "NO ACTION", nullable: false })
    @JoinColumn({ name: "agent_id" })
    agent: Agent;

    @ManyToOne(type => Company, company => company.careers, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "company_id" })
    company: Company;

    @ManyToOne(type => AgentRole, role => role.careers, { onDelete: "NO ACTION", nullable: false})
    @JoinColumn({ name: "agent_role_id" })
    role: AgentRole

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`career ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}