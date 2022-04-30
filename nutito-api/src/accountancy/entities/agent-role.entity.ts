import { Company } from './company.entity';
import { User } from '../../user/entities/user.entity';
import { Column, JoinColumn, OneToMany } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Career } from './career.entity';
import { Audit } from './audit.entity';

@Entity()
export class AgentRole extends Audit {

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @OneToMany(type => Career, career => career.agent, { onDelete: "NO ACTION" })
    @JoinColumn({ name: "type_agent_id" })
    careers: Career[]

}