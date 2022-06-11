import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { File } from '../../accountancy/entities/file.entity';
import { BaseEntity } from '../../accountancy/entities/base.entity';
import { UserTypeEnum } from '../../utilities/enums/user-type.enum';
import { hashPassword } from "../../utilities/helpers/functions.helper";
import { Agent } from "../../accountancy/entities/agent.entity";
import { Company } from "../../accountancy/entities/company.entity";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: true })
    firstname: string;

    @Column({ nullable: true })
    lastname: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    ifu: string;

    @Column({ nullable: true })
    birth_date: Date;

    @Column({ nullable: true })
    birth_place: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true })
    city: string;

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

    @Column('boolean', { default: true })
    active: boolean;

    @OneToOne(type => File, { onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_picture_id" })
    profile_picture?: File; 

    @OneToMany(type => Agent, agent => agent.user, { onDelete: "CASCADE" })
    agents: Agent[];

    @OneToMany(type => Company, company => company.owner, { onDelete: "CASCADE" })
    companies: Company[];

    get profile(): File {
        return this.profile_picture;
    }

    @BeforeInsert()
    async setPassword() {
        this.password = await hashPassword(this.password!);
    }

}