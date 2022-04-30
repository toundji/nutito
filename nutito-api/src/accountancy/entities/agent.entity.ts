import { Company } from './company.entity';
import { User } from './../../user/entities/user.entity';
import { Column, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Career } from './career.entity';
import { Audit } from './audit.entity';

@Entity()
export class Agent extends Audit {

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(type => Career, career => career.agent, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "type_agent_id" })
    careers: Career[]

    @Column('date')
    created_at: Date;

    @Column('date')
    updated_at: Date;

    @Column()
    creator_id: number;

    @Column({ nullable: true })
    updated_id: number;

}