import { Entity } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'typeorm';
@Entity()
export class File extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    location: string;

    @Column({nullable: false})
    mimetype: string;

    @Column({nullable: false})
    entity: string;

    @Column({nullable: false})
    entity_id: number;
    

   


    
}