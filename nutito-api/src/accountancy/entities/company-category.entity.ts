/* eslint-disable prettier/prettier */
import { Entity, OneToMany, Column } from 'typeorm';
import { Company } from './company.entity';
import { BaseEntity } from './base.entity';


@Entity()
export class CompanyCategory extends BaseEntity {

    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    description: string;

    @OneToMany(type => Company, company => company.category, { onDelete: "NO ACTION" })
    companies?: Company[]

}