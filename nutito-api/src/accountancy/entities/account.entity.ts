import { sluggify } from 'src/utilities/helpers/functions.helper';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class Account extends BaseEntity {

    @Column()
    code: string;
    
    // Cet attribut représente le solde du compte
    @Column()
    amount: number;


    @Column({ nullable: true })
    amount_in: number;

    @Column({ nullable: true })
    amount_out: number;

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`account ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}