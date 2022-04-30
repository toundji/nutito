import { Column, OneToOne } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from './audit.entity';
@Entity()
export class Account extends Audit {

    // Cet attribut représente le solde du compte
    @Column()
    amount: number;

    @Column()
    code: string;

    @Column()
    amount_in: number;

    @Column()
    amount_out: number;

}