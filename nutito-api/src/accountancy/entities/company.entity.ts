import { CategoryCompany } from './category-company.entity';
import { Domaine } from './domaine.entity';
import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn, BaseEntity  } from 'typeorm';


@Entity()
export class Company extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    domaine: Domaine;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    city: string;

    @Column({nullable: false})
    country: Country;

    @Column({nullable: false})
    adress: string;

    @Column({nullable: false})
    ifu: string;

    @Column({nullable: false})
    rccm: string;

    @Column({nullable: false})
    category: CategoryCompany;


    @Column({nullable: false})
    licence: Licences;

    @Column({nullable: false})
    licences: Licence;

}
