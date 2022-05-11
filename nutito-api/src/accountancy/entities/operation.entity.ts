import { Column, JoinColumn, ManyToOne, OneToMany, Entity, BeforeInsert } from 'typeorm';
import { BaseEntity } from './base.entity';
import { File } from '../entities/file.entity';
import { OperationType } from './operation-type.entity';
import { ClientOperationType } from './client-operation-type.entity';
import { sluggify } from 'src/utilities/helpers/functions.helper';


@Entity()
export class Operation extends BaseEntity {

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    amount: number;
    
    @Column()
    amount_in: number;

    @Column()
    amount_out: number;

    @Column()
    balance: number;

    @Column()
    description: string;

    @OneToMany(type => File, file => file.operation, { onDelete: "CASCADE" })
    documents: File[]; 

    @ManyToOne(type => OperationType, operation_type => operation_type.operations, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "operation_type_id" })
    operation_type: OperationType;

    @ManyToOne(type => ClientOperationType, client_operation_type => client_operation_type.operations, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "client_operation_type_id" })
    client_operation_type: ClientOperationType;

    get month() {
        return this.date.getMonth();
    }

    get type(): string {
        return this.operation_type.type;
    }

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`operation ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}