/* eslint-disable prettier/prettier */
import { Column, JoinColumn, Entity, OneToMany } from 'typeorm';
import { Career } from './career.entity';
import { Audit } from './audit.entity';

@Entity()
export class AgentRole extends Audit {

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @OneToMany(type => Career, career => career.agent, { onDelete: "NO ACTION" })
    careers: Career[]

}