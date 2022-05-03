/* eslint-disable prettier/prettier */
import { Entity, OneToMany, Column } from 'typeorm';
import { Company } from './company.entity';
import { Audit } from './audit.entity';


@Entity()
export class CompanyCategory extends Audit {

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @OneToMany(type => Company, company => company.category, { onDelete: "NO ACTION" })
    companies: Company[]

}