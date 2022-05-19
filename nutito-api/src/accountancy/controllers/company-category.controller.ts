/* eslint-disable prettier/prettier */
import { CreateCompanyCategory } from './../dtos/create-company-category.dto';
import { CompanyCategoryService } from './../services/company-category.service';
import { CompanyCategory } from './../entities/company-category.entity';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UpdateCompanyCategoryDto } from '../dtos/update-company-category.dto';

@Controller('compananies-categories')
export class CompanyCategoryController{
    constructor(private readonly companyCategoryService: CompanyCategoryService){}

    @Post('/create')
    async createCarrer(@Body() createCompanyCategoryDto : CreateCompanyCategory): Promise<CompanyCategory>{
        return await this.companyCategoryService.create(createCompanyCategoryDto);
    }

    @Get()
    async getAllCompanyCategory(): Promise<CompanyCategory[]>{
        return await this.companyCategoryService.findAll();
    }

    @Get('/:id')
    async getCarrerById(
        @Param('id') id :number
    ): Promise<CompanyCategory>{
        return await this.companyCategoryService.findOneById(id);
    } 
    
    @Put('update/:id')
    async updateAccount(@Param('id') id : number, @Body() updateCompanyCategoryDto : UpdateCompanyCategoryDto){
        return await this.companyCategoryService.update(id, updateCompanyCategoryDto);
    }

    @Delete('delete/:id')
    async deleteAccount(@Param('id') id : number){
        return await this.companyCategoryService.delete(id);
    }
}