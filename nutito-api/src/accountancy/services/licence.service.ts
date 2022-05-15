import { CompanySerice } from './company.service';
import { CreateLicenceDto } from './../dtos/create-licence.dto';
import { DeleteResult } from 'typeorm';
import { Licence } from './../entities/licence.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class LicenceService{
    constructor(
        @InjectRepository(Licence)
        private readonly licenceRepository : Repository<Licence>,
        private readonly companySerice: CompanySerice
    ){}

    async findAll(): Promise<Licence[]>{
        return await this.licenceRepository.find();
    }

    async findOnById(id: number): Promise<Licence>{
      

         const companny = await this.licenceRepository.findOneOrFail({where : { id : id}}).catch(
            (error)=> {
                throw new NotFoundException(`Licence with id ${id} is not found`);
            }
         )
         return companny;

    }

    async delete(id :number): Promise<DeleteResult>{
        return  this.licenceRepository.softDelete(id);

    }

    async create(licenceCreateDto : CreateLicenceDto): Promise< any >{
        const newLicence= new Licence();
        const company = await this.companySerice.findOnById(licenceCreateDto.company_id);
        newLicence.company.id = company.id;
        newLicence.save();
       return newLicence;
        

    }

}