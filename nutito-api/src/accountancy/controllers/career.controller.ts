/* eslint-disable prettier/prettier */
import { UpdateCareerDto } from './../dtos/update-career.dto';
import { Career } from './../entities/career.entity';
import { CreateCareerDto } from './../dtos/create-career.dto';
import { careerService } from './../services/career.service';
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
@Controller('carrers')
export class CareerController{
    constructor(
        private readonly careerservice : careerService
    ){}

    @Post('/create')
    async createCarrer(@Body() createCareerDto : CreateCareerDto): Promise<Career>{
        return await this.careerservice.create(createCareerDto);
    }

    @Get()
    async getAllCareer(): Promise<Career[]>{
        return await this.careerservice.findAll();
    }

    @Get('/:id')
    async getCarrerById(
        @Param('id') id :number
    ): Promise<Career>{
        return await this.careerservice.findOneById(id);
    } 
    
    @Put('update/:id')
    async updateAccount(@Param('id') id : number, @Body() updateCareerDto : UpdateCareerDto){
        return await this.careerservice.update(id, updateCareerDto);
    }

    @Delete('delete/:id')
    async deleteAccount(@Param('id') id : number){
        return await this.careerservice.delete(id);
    }
    



}