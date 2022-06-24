import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';

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

    @ManyToOne(type => Company, company => company.clientOperationTypes, { onDelete: "NO ACTION" })
    @JoinColumn({ name: "company_id"})
    company?: Company;

}