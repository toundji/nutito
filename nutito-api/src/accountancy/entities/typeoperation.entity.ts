import { BaseEntity } from 'typeorm';
@Entity()
export class TypeOperation() extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id:Number;

    @column({nullable: false})
    name: String;

    @column({nullable: false})
    description: String;

    @Column('boolean', { default: false })
    type: boolean;

    
}