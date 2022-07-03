import { Entity, Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Agent } from './agent.entity';
import { CompanyCategory } from './company-category.entity';
import { BaseEntity } from './base.entity';
import { Licence } from './licence.entity';
import { Account } from './account.entity';
import { Workfield } from './workfield.entity';
import { User } from '../../user/entities/user.entity';
import { Fichier } from './fichier.entity';
import { OperationType } from './operation-type.entity';
import { ClientOperationType } from './client-operation-type.entity';


@Entity()
export class Company extends BaseEntity {

    @Column({nullable: false})
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    city: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true })
    ifu: string;

    @Column({ nullable: true })
    rccm: string;

    @Column({ nullable: false, default: 3 })
    agent_number: number;

    @Column({ nullable: true, default: "1M"})
    duration: string;

    @ManyToOne(type => User, user => user.companies, { onDelete: "SET NULL" })
    @JoinColumn({ name: "owner_id" })
    owner: User;

    @OneToMany(type => Agent, agent => agent.company, { onDelete: "NO ACTION" })
    agents?: Agent[];

    @ManyToOne(type => CompanyCategory, category => category.companies, { onDelete: "SET NULL", eager:true })
    @JoinColumn({ name: "company_category_id" })
    category!: CompanyCategory;

    @OneToMany(type => Licence, licence => licence.company, { onDelete: "NO ACTION" })
    licences?: Licence[];

    @ManyToOne(type => Licence, licence => licence.company, { onDelete: "NO ACTION", eager:true })
    @JoinColumn({ name: "licence_id"})
    licence?: Licence;

    @OneToOne(() => Account, { nullable: true, eager:true})
    @JoinColumn({ name: "account_id" })
    account!: Account;

    @ManyToOne(type => Fichier, { onDelete: "SET NULL" })
    @JoinColumn({ name: "logo_id" })
    logo: Fichier;

    @ManyToMany(type => Workfield, { eager: true } )
    @JoinTable({ name: "companies_workfields" })
    workfields?: Workfield[];


    @ManyToMany(type => OperationType )
    @JoinTable({ name: "companies_operations" })
    operationTypes?: OperationType[];

    @OneToMany(type => ClientOperationType, clientOperationType => clientOperationType.company, { onDelete: "CASCADE" })
    clientOperationTypes?: ClientOperationType[];
    
    get license(): Licence {
        return this.licences.find((licence) => licence.expiryDate > new Date())
    }

}
