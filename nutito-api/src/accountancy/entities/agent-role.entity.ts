import { Column, Entity, OneToMany } from 'typeorm';
import { Career } from './career.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class AgentRole extends BaseEntity {

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @OneToMany(type => Career, career => career.role, { onDelete: "NO ACTION" })
    careers: Career[]

}