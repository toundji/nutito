import { CreateCompanyCategory } from './../dtos/create-company-category.dto';
/* eslint-disable prettier/prettier */
import { UpdateCompanyCategoryDto } from './../dtos/update-company-category.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CompanyCategory } from './../entities/company-category.entity';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Exception } from 'handlebars';
@Injectable()
export class CompanyCategoryService{
    constructor(
        @InjectRepository(CompanyCategory)
        private readonly companyCategoryRepository : Repository<CompanyCategory>
    ){}

    async findAll(): Promise<CompanyCategory[]>{
        return this.companyCategoryRepository.find();
    }

    async findOneById(id : number): Promise<CompanyCategory>{
         const companyCategory = await this.companyCategoryRepository.findOneOrFail(id);
         if(companyCategory){
             return companyCategory;
         }
          throw new HttpException('Company Category not found', HttpStatus.NOT_FOUND);
           
    }

    async delete(companyCategory: number): Promise<DeleteResult>{
        return this.companyCategoryRepository.delete(companyCategory);
    }

    async create(createCompanyCategory : CreateCompanyCategory): Promise<CompanyCategory>{
        const newCompanyCategory = await this.companyCategoryRepository.create(createCompanyCategory);
        return await this.companyCategoryRepository.save(newCompanyCategory);
    }
    
    async update(companyCategory: number, updateCompanyCategoryDto: UpdateCompanyCategoryDto): Promise<UpdateResult>{
        return this.companyCategoryRepository.update(companyCategory,updateCompanyCategoryDto);
    }

}