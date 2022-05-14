/* eslint-disable prettier/prettier */
import { Entity, Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Career } from './career.entity';
import { CompanyCategory } from './company-category.entity';
import { BaseEntity } from './base.entity';
import { Licence } from './licence.entity';
import { Account } from './account.entity';
import { Workfield } from './workfield.entity';


@Entity()
export class Company extends BaseEntity {

    @Column({nullable: false})
    name: string;

    @Column()
    description: string;

    @Column()
    city: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    ifu: string;

    @Column()
    rccm: string;

    @OneToMany(type => Career, career => career.company, { onDelete: "NO ACTION" })
    careers?: Career[]

    @ManyToOne(type => CompanyCategory, category => category.companies, { onDelete: "SET NULL" })
    @JoinColumn({ name: "company_category_id" })
    category!: CompanyCategory;

    @OneToMany(type => Licence, licence => licence.company, { onDelete: "NO ACTION" })
    licences?: Licence[];

    @OneToOne(() => Account, { nullable: true })
    @JoinColumn({ name: "account_id" })
    account!: Account;

    @ManyToMany(type => Workfield, workfield => workfield.companies, { onDelete: "NO ACTION" })
    @JoinTable({ name: "companies_workfields" })
    workfields?: Workfield[]; 

    get license(): Licence {
        return this.licences[this.licences.length - 1];
    }

}
