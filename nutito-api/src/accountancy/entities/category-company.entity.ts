import { Entity } from 'typeorm';
import { Compnay } from './company.entity';
import { Column, PrimaryGeneratedColumn, BaseEntity  } from 'typeorm';


@Entity()
export class CategoryCompany extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;



}