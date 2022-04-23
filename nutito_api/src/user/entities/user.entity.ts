import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: false })
    user_type: string;

    @Column({ nullable: true })
    verification_token: string;

    @Column('boolean', { default: false })
    active: boolean;

    @Column({ nullable: true, unique: true })
    slug: string;

}