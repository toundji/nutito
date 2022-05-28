import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class Constants extends BaseEntity {

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    value: string;
}