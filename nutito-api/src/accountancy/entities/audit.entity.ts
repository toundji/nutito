import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Audit extends BaseEntity  {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    created_at: Date = new Date();

    @Column({ nullable: true })
    updated_at: Date;

    @Column({ nullable: true })
    creator_id: number;

    @Column({ nullable: true })
    updater_id: number;

    @Column({ unique: true })
    slug: string;

}