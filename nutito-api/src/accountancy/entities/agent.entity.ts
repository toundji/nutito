import { Company } from './company.entity';
import { User } from './../../user/entities/user.entity';
import { Column } from 'typeorm';
import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Angent extends BaseEntity{
    @Column({nullable: false})
    user: User;

    @Column({nullable: false})
    company: Company;

    @Column({nullable: false})
    typeAgent: TypeAgent;

    @Column({nullable: false})
    modifie: boolean;



}