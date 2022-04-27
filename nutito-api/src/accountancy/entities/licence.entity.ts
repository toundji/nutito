import { Compnay } from './company.entity';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Licence(){
    @PrimaryGeneratedColumn('increment')
    id:Number;

    @Column({nullable: false})
    compnay: Compnay;

    @Column({nullable: false})
    expire_date: Date;

    @Column({nullable: false})
    amount: Number;

    @Column({nullable: false})
    code: String;

    @Column({nullable: false})
    moyen: Moyen;

    @Column({nullable: false})
    transaction_id: string;

    @Column({nullable: false})
    transaction_info: string;



}