/* eslint-disable prettier/prettier */
import { User } from '../../user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Operation } from './operation.entity';
@Entity()
export class File extends BaseEntity {

    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    mimetype: string;

    @Column('integer')
    entity_id: number;

    
    @ManyToOne(type => Operation, operation => operation.documents, { onDelete: "CASCADE" })
    @JoinColumn({ name: "operation_id" })
    operation!: Operation

    @ManyToOne(type => User, user => user.profile_pictures, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user!: User;

}