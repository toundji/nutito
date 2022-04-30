import { Column } from 'typeorm';
import { Compnay } from './company.entity';
import { Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
@Entity()
export class Compte extends BaseEntityity{
    @PrimaryGeneratedColumn('increment')
    company: Compnay;

    @Column({nullable: false})
    solde: number;

    @Column({nullable: false})
    code: string;



}