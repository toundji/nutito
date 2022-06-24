import { Column, JoinColumn, ManyToOne, OneToMany, Entity, OneToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Fichier } from './fichier.entity';
import { OperationType } from './operation-type.entity';
import { ClientOperationType } from './client-operation-type.entity';
import { Company } from './company.entity';
import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';


@Entity()
export class Operation extends BaseEntity {

    @Column()
    name: string;

    @Column('date', {nullable:true})
    date?: Date;

    @Column('float')
    amount: number;
    
    @Column('float')
    amount_in: number;

    @Column('float')
    amount_out: number;

    @Column('float')
    balance: number;

    @Column({nullable:true})
    description: string;

    @Column({
        type: "enum",
        enum: OperationTypeEnum,
        nullable:true,
        default: OperationTypeEnum.IN
    })
    type: OperationTypeEnum;

    @OneToOne(() => Fichier)
    @JoinColumn({ name: "document_id" })
    document?: Fichier;

    @ManyToOne(type => Company, company => company.clientOperationTypes, { onDelete: "NO ACTION" })
    @JoinColumn({ name: "company_id"})
    company?: Company;

    @RelationId((operation: Operation) => operation.company)
    company_id:number;

    @ManyToOne(type => OperationType, { onDelete: "SET NULL" , eager: true})
    @JoinColumn({ name: "operation_type_id" })
    operationType!: OperationType;

    @ManyToOne(type => ClientOperationType, { onDelete: "SET NULL" , eager: true})
    @JoinColumn({ name: "client_operation_type_id" })
    clientOperationType!: ClientOperationType;

    get month() {
        return this.date.getMonth();
    }
}