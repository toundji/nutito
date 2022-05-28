import { sluggify, uuid } from '../../utilities/helpers/functions.helper';
import { 
    BaseEntity as TypeOrmBaseEntity, 
    BeforeInsert, 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
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
    @DeleteDateColumn()
    deleted_at: Date ;

    @Column({ nullable: true })
    creator_id: number;

    @Column({ nullable: true })
    updater_id: number;

    @Column()
    slug: string;

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`${uuid()}`);
    }

}