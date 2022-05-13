import { PaymentTypeEnum } from '../../utilities/enums/payment-type.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
@Entity()
export class Licence extends BaseEntity {

    @Column()
    expiry_date: Date;

    @Column()
    amount: string;

    @Column()
    code: string;

    @Column({
        type: "enum",
        enum: PaymentTypeEnum,
        default: PaymentTypeEnum.KKIAPAY
    })
    payment_type: string

    @Column()
    transaction_id: string;

    @Column()
    transaction_info: string;

    @ManyToOne(type => Company, company => company.licences, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "company_id" })
    company: Company;

}