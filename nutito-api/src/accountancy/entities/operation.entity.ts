import { Column, JoinColumn, ManyToOne, OneToMany, Entity, OneToOne } from 'typeorm';
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

    @OneToOne(() => File)
    @JoinColumn({ name: "document_id" })
    document?: File; 

    @ManyToOne(type => OperationType, operationType => operationType.operations, { onDelete: "SET NULL" })
    @JoinColumn({ name: "operation_type_id" })
    operationType!: OperationType;

    @ManyToOne(type => ClientOperationType, clientOperationType => clientOperationType.operations, { onDelete: "SET NULL" })
    @JoinColumn({ name: "client_operation_type_id" })
    clientOperationType!: ClientOperationType;

    get month() {
        return this.date.getMonth();
    }

    get type(): string {
        return this.operationType.type;
    }

}