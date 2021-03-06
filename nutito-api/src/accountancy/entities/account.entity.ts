import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Account extends BaseEntity {

    // Cet attribut représente le solde du compte
    @Column('float', { default: 0 , nullable: true})
    amount: number;

    @Column('float', { default: 0 , nullable: true})
    amount_in: number;

    @Column('float', { default: 0 , nullable: true})
    amount_out: number;

}