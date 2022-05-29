import { PaymentTypeEnum } from '../../utilities/enums/payment-type.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { LicenceTypeEnum } from '../../utilities/enums/licence-type.enum';
@Entity()
export class Licence extends BaseEntity {

    @Column({ nullable: true })
    expiryDate: Date;

    @Column('float', { nullable: true })
    amount: number;

    @Column({ nullable: true })
    code: string;

    @Column({
        type: "enum",
        enum: LicenceTypeEnum,
        default: LicenceTypeEnum.MONTHLY,
        nullable: true
    })
    licenceType: string;

    @Column({
        type: "enum",
        enum: PaymentTypeEnum,
        default: PaymentTypeEnum.KKIAPAY
    })
    paymentType: string

    @Column({ nullable: true })
    transactionId: string;

    @Column({ nullable: true })
    transactionInfo: string;

    @ManyToOne(type => Company, company => company.licences, { onDelete: "CASCADE" })
    @JoinColumn({ name: "company_id" })
    company!: Company;

}