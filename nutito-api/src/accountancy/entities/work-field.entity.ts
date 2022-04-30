import { Entity, Column, ManyToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Company } from './company.entity';
@Entity()
export class WorkField extends Audit {

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @ManyToMany(() => Company)
    companies: Company[];

}