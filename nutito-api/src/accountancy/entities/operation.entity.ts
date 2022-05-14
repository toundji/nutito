import { Column, JoinColumn, ManyToOne, OneToMany, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { File } from '../entities/file.entity';
import { OperationType } from './operation-type.entity';
import { ClientOperationType } from './client-operation-type.entity';


@Entity()
export class Operation extends BaseEntity {

    @Column()
    name: string;

    @Column('date')
    date: Date;

    @Column('float')
    amount: number;
    
    @Column('float')
    amount_in: number;

    @Column('float')
    amount_out: number;

    @Column('float')
    balance: number;

    @Column()
    description: string;

    @OneToMany(type => File, file => file.operation, { onDelete: "CASCADE" })
    documents?: File[]; 

    @ManyToOne(type => OperationType, operation_type => operation_type.operations, { onDelete: "SET NULL" })
    @JoinColumn({ name: "operation_type_id" })
    operation_type!: OperationType;

    @ManyToOne(type => ClientOperationType, client_operation_type => client_operation_type.operations, { onDelete: "SET NULL" })
    @JoinColumn({ name: "client_operation_type_id" })
    client_operation_type!: ClientOperationType;

    get month() {
        return this.date.getMonth();
    }

    get type(): string {
        return this.operation_type.type;
    }

}