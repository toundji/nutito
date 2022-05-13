import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class Account extends BaseEntity {

    @Column()
    code: string;
    
    // Cet attribut représente le solde du compte
    @Column()
    amount: string;


    @Column({ nullable: true })
    amount_in: string;

    @Column({ nullable: true })
    amount_out: string;

}