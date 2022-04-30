import { Entity, Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Career } from './career.entity';
import { CompanyCategory } from './company-category.entity';
import { Audit } from './audit.entity';
import { Licence } from './licence.entity';
import { Account } from './account.entity';
import { WorkField } from './work-field.entity';


@Entity()
export class Company extends Audit {

    @Column({nullable: false})
    name: string;

    @Column()
    description: string;

    @Column()
    city: string;

    @Column()
    adress: string;

    @Column()
    ifu: string;

    @Column()
    rccm: string;

    @OneToMany(type => Career, career => career.company, { onDelete: "NO ACTION" })
    careers: Career[]

    @ManyToOne(type => CompanyCategory, category => category.companies, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "company_category_id" })
    category: CompanyCategory;

    @OneToMany(type => Licence, licence => licence.company, { onDelete: "NO ACTION" })
    licences: Licence[];

    @OneToOne(() => Account)
    account: Account;

    @ManyToMany(type => WorkField, workfield => workfield.companies, { onDelete: "NO ACTION" })
    @JoinTable({ name: "companies_workfields" })
    workfields: WorkField[]; 

    get license(): Licence {
        return this.licences[this.licences.length - 1];
    }

}
