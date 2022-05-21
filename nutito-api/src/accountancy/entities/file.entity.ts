import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity()
export class File extends BaseEntity {

    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    mimetype: string;

    @Column()
    entity_name: string;

}