import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';
import { sluggify } from 'src/utilities/helpers/functions.helper';
import { Column, OneToMany, Entity, BeforeInsert } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Operation } from './operation.entity';

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
    type: string;

    @OneToMany(type => Operation, operation => operation.type, { onDelete: "NO ACTION" })
    operations: Operation[];

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`operation type ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}