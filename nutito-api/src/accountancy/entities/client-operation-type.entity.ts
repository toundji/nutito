import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Operation } from './operation.entity';

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

    @OneToMany(type => Operation, operation => operation.client_operation_type, { onDelete: "NO ACTION" })
    operations?: Operation[];

}