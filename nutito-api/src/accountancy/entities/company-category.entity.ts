import { Entity, OneToMany } from 'typeorm';
import { Column, PrimaryGeneratedColumn, BaseEntity  } from 'typeorm';
import { Company } from './company.entity';
import { Audit } from './audit.entity';


@Entity()
export class CompanyCategory extends Audit {

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @OneToMany(type => Company, company => company.category, { onDelete: "CASCADE", nullable: false })
    companies: Company[]



}