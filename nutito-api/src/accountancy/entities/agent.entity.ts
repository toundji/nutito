import { User } from './../../user/entities/user.entity';
import { JoinColumn, Entity, OneToMany, OneToOne } from 'typeorm';
import { Career } from './career.entity';
import { BaseEntity } from './base.entity';


@Entity()
export class Agent extends BaseEntity {

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @OneToMany(type => Career, career => career.agent, { onDelete: "NO ACTION" })
    careers?: Career[]
}