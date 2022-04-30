import { BaseEntity, Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';


export abstract class Audit extends BaseEntity  {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;

    @Column()
    creator_id: number;

    @Column({ nullable: true })
    updater_id: number;

}