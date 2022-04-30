import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Column } from 'typeorm';
import { Audit } from './audit.entity';
import { Operation } from './operation.entity';
@Entity()
export class File extends Audit {

    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    mimetype: string;

    @Column()
    entity_id: number;
    
    @ManyToOne(type => Operation, operation => operation.documents, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "operation_id" })
    operation: Operation

    @ManyToOne(type => User, user => user.profile_pictures, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "user_id" })
    user: User

}