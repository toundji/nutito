import { Entity, Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, BeforeInsert } from 'typeorm';
import { Career } from './career.entity';
import { CompanyCategory } from './company-category.entity';
import { BaseEntity } from './base.entity';
import { Licence } from './licence.entity';
import { Account } from './account.entity';
import { WorkField } from './workfield.entity';
import { sluggify } from 'src/utilities/helpers/functions.helper';


@Entity()
export class Company extends BaseEntity {

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

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`company ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}
