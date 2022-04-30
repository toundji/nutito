import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Audit } from './audit.entity';
import { Company } from './company.entity';
@Entity()
export class WorkField extends Audit {

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @ManyToMany(type => Company, company => company.workfields, { onDelete: "NO ACTION" })
    @JoinTable({ name: "companies_workfields" })
    companies: Company[];

}