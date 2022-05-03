/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { Audit } from './audit.entity';
@Entity()
export class Account extends Audit {

    @Column()
    code: string;
    
    // Cet attribut représente le solde du compte
    @Column()
    amount: number;


    @Column()
    amount_in: number;

    @Column()
    amount_out: number;

}