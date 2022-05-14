import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
@Entity()
export class Workfield extends BaseEntity {

    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    description: string;

    @ManyToMany(type => Company, company => company.workfields, { onDelete: "NO ACTION", nullable: true })
    @JoinTable({ name: "companies_workfields" })
    companies?: Company[];

}