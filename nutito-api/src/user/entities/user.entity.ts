import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from '../../accountancy/entities/file.entity';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column({ unique: true })
    ifu: string;

    @Column('date', { nullable: true })
    birth_date: Date;

    @Column({ nullable: true })
    birth_place: string;

    @Column({ nullable: true })
    address: string;

    @Column()
    password: string;

    @Column({ nullable: false })
    user_type: string;

    @OneToMany(type => File, file => file, { onDelete: "CASCADE", nullable: true })
    profile_pictures: File[]; 

    get profile(): File {
        return this.profile_pictures[this.profile_pictures.length - 1];
    }

    @Column()
    country: string;

    @Column({ nullable: true })
    verification_token: string;

    @Column('boolean', { default: false })
    active: boolean;

    @Column({ nullable: true, unique: true })
    slug: string;

}