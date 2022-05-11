import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from '../../accountancy/entities/file.entity';
import { BaseEntity } from '../../accountancy/entities/base.entity';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';
import { hashPassword, sluggify } from "src/utilities/helpers/functions.helper";

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
    profile_pictures: File[]; 

    get profile(): File {
        return this.profile_pictures[this.profile_pictures.length - 1];
    }

    @BeforeInsert()
    async setPasswordAndSlug() {
        this.password = await hashPassword(this.password!);
        this.slug = await sluggify(`user ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}