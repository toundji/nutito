import { OperationTypeEnum } from '../../utilities/enums/operation-type.enum';
import { Column, OneToMany, Entity, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Operation } from './operation.entity';
import { ClientOperationType } from './client-operation-type.entity';
import { Workfield } from './workfield.entity';

@Entity()
export class OperationType extends BaseEntity {

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: OperationTypeEnum,
        default: OperationTypeEnum.IN
    })
    type: OperationTypeEnum;

    
    @ManyToMany(type=>Workfield, field=>field.operationTypes, {eager:true})
    @JoinTable({
      name: 'operations_workfields',
      joinColumn: { name: 'peration_type_id', referencedColumnName: 'id'},
      inverseJoinColumn: { name: 'workfield_id', referencedColumnName: 'id'},
    })
    workfields?: Workfield[];

    get  personal():boolean{return false};

    // @OneToMany(type => Operation, operation => operation.type, { onDelete: "NO ACTION" })
    // operations?: Operation[];


}