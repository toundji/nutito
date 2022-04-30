import { PaymentTypeEnum } from 'src/utilities/enums/payment-type.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Company } from './company.entity';
@Entity()
export class Licence extends Audit {

    @Column()
    expiry_date: Date;

    @Column()
    amount: number;

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