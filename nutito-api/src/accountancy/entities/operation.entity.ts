import { Column } from 'typeorm';
/* eslint-disable prettier/prettier */
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'typeorm';
import { Compte } from './compte.entity';
import { File } from './file.entity';
import { operationClient } from './operationclient.entity';


@Entity()
export class Operation extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    compte : Compte;

    @Column({nullable: false})
    date: Date;

    @Column({nullable: false})
    type: OperationType;

    @Column({nullable: false})
    amount: number;

    @Column({nullable: false})
    balance: number;

    @Column({nullable: false})
    operation_client: operationClient;

    @Column({nullable: false})
    description: String;

    @Column({nullable: false})
    month: Date;

    @Column({nullable: false})
    document: File;

    @Column('boolean', { default: false })
    type: boolean;

    
}