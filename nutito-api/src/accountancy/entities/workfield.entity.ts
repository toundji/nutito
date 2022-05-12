import { sluggify } from 'src/utilities/helpers/functions.helper';
import { Entity, Column, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
@Entity()
export class WorkField extends BaseEntity {

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @ManyToMany(type => Company, company => company.workfields, { onDelete: "NO ACTION" })
    @JoinTable({ name: "companies_workfields" })
    companies: Company[];

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`workfield ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}