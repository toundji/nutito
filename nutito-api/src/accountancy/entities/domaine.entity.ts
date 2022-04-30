import { Entity, Column, BaseEntity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
@Entityty()
export class Domaine extends BaseEntityty{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;


}