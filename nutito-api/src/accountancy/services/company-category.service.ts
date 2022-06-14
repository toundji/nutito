/* eslint-disable prettier/prettier */
import { CreateCompanyCategory } from './../dtos/create-company-category.dto';
import { UpdateCompanyCategoryDto } from './../dtos/update-company-category.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CompanyCategory } from './../entities/company-category.entity';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Exception } from 'handlebars';
import { faker } from "@faker-js/faker"

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

    
    init():Promise<CompanyCategory[]>{
        return this.companyCategoryRepository.find().then((olds)=>{
            if(olds && olds.length > 0){
                console.log(olds);

                return olds;
              }
                const fields = [
                    {
                        short: "ENTREPRENANT",
                        name: "ENTREPRENANT",
                        description: faker.lorem.lines(3),
                    },
                    {
                        short: "ENTREPRISE INDIVIDUELLE",
                        name: "ENTREPRISE INDIVIDUELLE",
                        description: faker.lorem.lines(3),
                    },
                    {
                        short: "SARL",
                        name: "LA SOCIÉTÉ À RESPONSABILITÉ LIMITÉE",
                        description: faker.lorem.lines(3),
                    },
                    {
                        short:"SA",
                        name: "LA SOCIÉTÉ ANONYME",
                        description: faker.lorem.lines(3),
                    },
                    {
                        short:"SPAS",
                        name: "LA SOCIÉTÉ PAR ACTIONS SIMPLIFIÉE",
                        description: faker.lorem.lines(3),
                    },
                    {
                        short:"SNC",
                        name: "LA SOCIÉTÉ EN NOM COLLECTIF",
                        description: faker.lorem.lines(3),
                    },
                    {
                        short:"scs",
                        name: "LA SOCIÉTÉ EN COMMANDITE SIMPLE",
                        description: faker.lorem.lines(3),
                    },{
                        short:"SP",
                        name: "LA SOCIÉTÉ EN PARTICIPATION",
                        description: faker.lorem.lines(3),
                    },{
                        short:"SF",
                        name: "LA SOCIÉTÉ DE FAIT",
                        description: faker.lorem.lines(3),
                    },{
                        short:"GIE",
                        name: "LE GROUPEMENT D’INTÉRÊT ECONOMIQUE",
                        description: faker.lorem.lines(3),
                    },{
                        short:"SOCIÉTÉ COOPÉR",
                        name: "SOCIÉTÉ COOPÉR",
                        description: faker.lorem.lines(3),
                    },
                    {
                        short:"SCOOPS",
                        name: "SOCIÉTÉ COOPÉRATIVE",
                        description: faker.lorem.lines(3),
                    },{
                        short:"SCOOPS-CA",
                        name: "SOCIÉTÉ COOPÉRATIVE: AVEC CONSEIL D’ADMINISTRATION",
                        description: faker.lorem.lines(3),
                    }
                ];
                const l =  this.companyCategoryRepository.create(fields);
                return this.companyCategoryRepository.save(l);
            
        })
        
    }

}