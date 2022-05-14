<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
=======
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> dev
import { File } from '../../accountancy/entities/file.entity';
import { BaseEntity } from '../../accountancy/entities/base.entity';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';
import { hashPassword } from "../../utilities/helpers/functions.helper";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    ifu: string;

    @Column({ nullable: true })
    birth_date: Date;

    @Column({ nullable: true })
    birth_place: string;

    @Column({ nullable: true })
    address: string;

    @Column()
    country: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserTypeEnum,
        default: UserTypeEnum.USER
    })
    user_type: string;

    @Column({ nullable: true })
    verification_token: string;

    @Column('boolean', { default: false })
    active: boolean;

    @OneToMany(type => File, file => file, { onDelete: "CASCADE" })
    profile_pictures?: File[]; 

    get profile(): File {
        return this.profile_pictures[this.profile_pictures.length - 1];
    }

    @BeforeInsert()
    async setPassword() {
        this.password = await hashPassword(this.password!);
    }

}