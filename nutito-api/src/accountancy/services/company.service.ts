import { WorkfieldService } from './workfield.service';
/* eslint-disable prettier/prettier */
import { CompanyCategoryService } from './company-category.service';
import { UpdateCompanyDto } from './../dtos/update-company.dto';
import { CreateCompanyDto } from './../dtos/create-company.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Company } from './../entities/company.entity';
import { Injectable, NotFoundException, Catch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly companyCategoryService: CompanyCategoryService,
    private readonly workfieldService: WorkfieldService
  ) {}

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOnById(id: number): Promise<Company> {
    const companny = await this.companyRepository
      .findOneOrFail({ where: { id: id } })
      .catch((error) => {
        throw new NotFoundException(`Company with id ${id} is not found`);
      });
    return companny;
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.companyRepository.softDelete(id);
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const newCompany = new Company();
    const categoryType = await this.companyCategoryService.findOneById(
      createCompanyDto.companyCategoryId,
    );
    // const wordkfield = await this.workfieldService.findOneById(createCompanyDto.workfields);
    Object.keys(createCompanyDto).forEach(
        (key) => {
            newCompany[key] = createCompanyDto[key];
        }
    );
    newCompany.category = categoryType;
    return newCompany.save();
  }

  async update(
    updateCompanyDto: UpdateCompanyDto,
    id: number,
  ): Promise<UpdateResult> {
    return await this.companyRepository.update(id, updateCompanyDto);
  }
}
