/* eslint-disable prettier/prettier */
import { CompanyCategoryService } from './company-category.service';
import { UpdateCompanyDto } from './../dtos/update-company.dto';
import { CreateCompanyDto } from './../dtos/create-company.dto';
import { Slugger } from 'src/utilities/helpers/slugger.helper';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Company } from './../entities/company.entity';
import { Injectable, NotFoundException, Catch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { retry } from 'rxjs';
@Injectable()
export class CompanySerice{
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository : Repository<Company>,
        private readonly companyCategoryService : CompanyCategoryService,
        private readonly slugger: Slugger
    ){}

    async findAll(): Promise<Company[]>{
        return await this.companyRepository.find();
    }

    async findOnById(id: number): Promise<Company>{
      

         const companny = await this.companyRepository.findOneOrFail({where : { id : id}}).catch(
            (error)=> {
                throw new NotFoundException(`Company with id ${id} is not found`);
            }
         )
         return companny;

    }

    async delete(id :number): Promise<DeleteResult>{
        return  this.companyRepository.softDelete(id);

    }

    async create(createCompanyDto : CreateCompanyDto): Promise<Company>{
        const newCompany = new Company();
      const  category_type = await this.companyCategoryService.findOneById(createCompanyDto.company_category_id);
        newCompany.category = category_type;
         newCompany.save();
        return newCompany;

    }

    async update(updateCompanyDto: UpdateCompanyDto, id:number):Promise<UpdateResult>{
        return await this.companyRepository.update(id,updateCompanyDto);
    }

}