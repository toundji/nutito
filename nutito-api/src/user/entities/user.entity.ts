import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from '../../accountancy/entities/file.entity';
import { Audit } from '../../accountancy/entities/audit.entity';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';

@Entity()
export class User extends Audit {

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

}