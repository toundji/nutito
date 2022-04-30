import { Column, BaseEntity } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Audi extends BaseEntityity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    creater_id: number;

    @Column({nullable: false})
    editer_id: number;

    @Column({nullable: false})
    create_at: Date;

    @Column({nullable: false})
    update_at: Date;



}