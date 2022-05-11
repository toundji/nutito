import { Entity, OneToMany, Column, BeforeInsert } from 'typeorm';
import { Company } from './company.entity';
import { BaseEntity } from './base.entity';
import { sluggify } from 'src/utilities/helpers/functions.helper';


@Entity()
export class CompanyCategory extends BaseEntity {

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @OneToMany(type => Company, company => company.category, { onDelete: "NO ACTION" })
    companies: Company[]

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`company category ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}