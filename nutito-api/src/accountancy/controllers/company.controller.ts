/* eslint-disable prettier/prettier */
import { UpdateCompanyDto } from './../dtos/update-company.dto';
import { CreateCompanyDto } from './../dtos/create-company.dto';
import { CompanySerice } from './../services/company.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Company } from '../entities/company.entity';

@Controller('companies')
export class CompanyController {

  constructor(private readonly companySerice : CompanySerice) { }

  @Post('/create')
  async createCompany(@Body() createCompanyDto : CreateCompanyDto): Promise<Company>{
      return await this.companySerice.create(createCompanyDto);
  }

  @Get()
  async getAllCompany(): Promise<Company[]>{
      return await this.companySerice.findAll();
  }

  @Get('/:id')
  async getCompanyById(
      @Param('id') id :number
  ): Promise<Company>{
      return await this.companySerice.findOnById(id);
  } 
  
  @Put('update/:id')
  async updateCompany(@Param('id') id : number, @Body() updateCompanyDto : UpdateCompanyDto){
      return await this.companySerice.update(updateCompanyDto, id);
  }

  @Delete('delete/:id')
  async deleteCompany(@Param('id') id : number){
      return await this.companySerice.delete(id);
  }


}
