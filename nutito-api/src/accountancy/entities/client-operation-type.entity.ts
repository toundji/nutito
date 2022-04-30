import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';
import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { Audit } from './audit.entity';
import { Operation } from './operation.entity';

@Entity()
export class ClientOperationType extends Audit {

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

    @OneToMany(type => Operation, operation => operation.client_operation_type, { nullable: false, onDelete: "CASCADE" })
    operations: Operation[];

}