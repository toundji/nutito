import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Agent } from './agent.entity';

@Entity()
export class AgentRole extends BaseEntity {

    @Column('varchar')
    name: string;

    @Column('text')
    description: string
    
}
