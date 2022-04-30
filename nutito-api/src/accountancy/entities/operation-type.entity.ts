import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';
import { Column, OneToMany } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Operation } from './operation.entity';

@Entity()
export class OperationType extends Audit {

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

    @OneToMany(type => Operation, operation => operation.type, { nullable: false, onDelete: "CASCADE" })
    operations: Operation[];

}