import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Operation } from './operation.entity';
import { OperationType } from './operation-type.entity';

@Entity()
export class ClientOperationType extends BaseEntity {

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: OperationTypeEnum,
        default: OperationTypeEnum.IN
    })
    type: string;

    @OneToMany(type => Operation, operation => operation.clientOperationType, { onDelete: "NO ACTION" })
    operations?: Operation[];

    @ManyToOne(type => OperationType, operationType => operationType.clientOperationTypes, { onDelete: "NO ACTION" })
    operationType?: OperationType;

}