import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { Career } from './career.entity';
import { BaseEntity } from './base.entity';
import { sluggify } from 'src/utilities/helpers/functions.helper';

@Entity()
export class AgentRole extends BaseEntity {

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @OneToMany(type => Career, career => career.role, { onDelete: "NO ACTION" })
    careers: Career[]

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`agent role ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}