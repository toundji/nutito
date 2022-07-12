import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Fichier extends BaseEntity {

    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    mimetype: string;

    @Column()
    entity_name: string;

    @Column()
    entity_id: number;

}