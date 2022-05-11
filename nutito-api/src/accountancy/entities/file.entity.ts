import { User } from 'src/user/entities/user.entity';
import { sluggify } from 'src/utilities/helpers/functions.helper';
import { Entity, JoinColumn, ManyToOne, Column, BeforeInsert } from 'typeorm';
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
    entity_id: number;
    
    @ManyToOne(type => Operation, operation => operation.documents, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "operation_id" })
    operation: Operation

    @ManyToOne(type => User, user => user.profile_pictures, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "user_id" })
    user: User

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`file ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}