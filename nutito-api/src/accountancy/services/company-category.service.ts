import { CreateCompanyCategory } from './../dtos/create-company-category.dto';
/* eslint-disable prettier/prettier */
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

    
    async init():Promise<CompanyCategory[]>{
        const olds: CompanyCategory[] = await this.companyCategoryRepository.find();

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
                    name: "LA SOCI??T?? ?? RESPONSABILIT?? LIMIT??E",
                    description: faker.lorem.lines(3),
                },
                {
                    short:"SA",
                    name: "LA SOCI??T?? ANONYME",
                    description: faker.lorem.lines(3),
                },
                {
                    short:"SPAS",
                    name: "LA SOCI??T?? PAR ACTIONS SIMPLIFI??E",
                    description: faker.lorem.lines(3),
                },
                {
                    short:"SNC",
                    name: "LA SOCI??T?? EN NOM COLLECTIF",
                    description: faker.lorem.lines(3),
                },
                {
                    short:"scs",
                    name: "LA SOCI??T?? EN COMMANDITE SIMPLE",
                    description: faker.lorem.lines(3),
                },{
                    short:"SP",
                    name: "LA SOCI??T?? EN PARTICIPATION",
                    description: faker.lorem.lines(3),
                },{
                    short:"SF",
                    name: "LA SOCI??T?? DE FAIT",
                    description: faker.lorem.lines(3),
                },{
                    short:"GIE",
                    name: "LE GROUPEMENT D???INT??R??T ECONOMIQUE",
                    description: faker.lorem.lines(3),
                },{
                    short:"SOCI??T?? COOP??R",
                    name: "SOCI??T?? COOP??R",
                    description: faker.lorem.lines(3),
                },
                {
                    short:"SCOOPS",
                    name: "SOCI??T?? COOP??RATIVE",
                    description: faker.lorem.lines(3),
                },{
                    short:"SCOOPS-CA",
                    name: "SOCI??T?? COOP??RATIVE: AVEC CONSEIL D???ADMINISTRATION",
                    description: faker.lorem.lines(3),
                }
            ];
            const l =  this.companyCategoryRepository.create(fields);
            return this.companyCategoryRepository.save(l);
        
        
    }

}