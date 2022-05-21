/* eslint-disable prettier/prettier */
import { Entity, OneToMany, Column, ManyToMany } from 'typeorm';
import { Company } from './company.entity';
import { BaseEntity } from './base.entity';
import { OperationType } from './operation-type.entity';


@Entity()
export class CompanyCategory extends BaseEntity {

    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    description: string;

    @OneToMany(type => Company, company => company.category, { onDelete: "NO ACTION" })
    companies?: Company[]

    @ManyToMany(type => OperationType)
    operationTypes: OperationType[];

}