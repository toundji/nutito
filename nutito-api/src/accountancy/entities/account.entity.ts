import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class Account extends BaseEntity {

    @Column()
    code: string;
    
    // Cet attribut représente le solde du compte
    @Column('float')
    amount: number;


    @Column('float', { default: 0 })
    amount_in: number;

    @Column('float', { default: 0 })
    amount_out: number;

}