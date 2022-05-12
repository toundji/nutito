import { sluggify } from 'src/utilities/helpers/functions.helper';
import { 
    BaseEntity as TypeOrmBaseEntity, 
    BeforeInsert, 
    Column, 
    CreateDateColumn, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity  {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    @UpdateDateColumn()
    updated_at: Date ;

    @Column({ nullable: true })
    creator_id: number;

    @Column({ nullable: true })
    updater_id: number;

    @Column({ unique: true })
    slug: string;

}