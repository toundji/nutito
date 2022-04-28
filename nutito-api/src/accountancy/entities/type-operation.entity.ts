import { Column } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'typeorm';
@Entity()
export class TypeOperation() extends BaseEntity{
    @PrimaryGeneratedColumneratedColumn('increment')
    id:Number;

    @Column({nullable: false})
    name: String;

    @column({nullable: false})
    description: String;

    @Column('boolean', { default: false })
    type: boolean;

    
}