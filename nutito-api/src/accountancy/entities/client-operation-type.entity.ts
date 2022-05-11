import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';
import { sluggify } from 'src/utilities/helpers/functions.helper';
import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm';
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
    operations: Operation[];

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`client operation type ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}