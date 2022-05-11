import { User } from './../../user/entities/user.entity';
import { JoinColumn, Entity, OneToMany, OneToOne, BeforeInsert } from 'typeorm';
import { Career } from './career.entity';
import { BaseEntity } from './base.entity';
import { sluggify } from 'src/utilities/helpers/functions.helper';

@Entity()
export class Agent extends BaseEntity {

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(type => Career, career => career.agent, { onDelete: "NO ACTION" })
    careers: Career[]

    @BeforeInsert()
    async setSlug() {
        this.slug = await sluggify(`agent ${(new Date()).toLocaleString(
            'fr-FR', 
            { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        )}`);
    }

}