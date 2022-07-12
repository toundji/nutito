import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { OperationType } from './operation-type.entity';
@Entity()
export class Workfield extends BaseEntity {

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @ManyToMany(type => OperationType, opeType=>opeType.workfields)
    operationTypes: OperationType[];

}