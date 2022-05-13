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

    @Column()
    entity_id: string;
    
    @ManyToOne(type => Operation, operation => operation.documents, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "operation_id" })
    operation: Operation

    @ManyToOne(type => User, user => user.profile_pictures, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "user_id" })
    user: User;

}