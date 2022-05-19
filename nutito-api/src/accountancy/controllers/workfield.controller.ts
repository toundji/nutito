/* eslint-disable prettier/prettier */
import { Workfield } from './../entities/workfield.entity';
import { UpdateWorkfieldDto } from './../dtos/update-workfield.dto';
import { CreateWorkfieldDto } from './../dtos/create-workfield.dto';
import { WorkfieldService } from './../services/workfield.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller('workfields')
export class WorkfieldController{
    constructor(private workfieldService : WorkfieldService){}

    
    @Post('/create')
    async create(@Body() createWorkfieldDto : CreateWorkfieldDto): Promise<Workfield>{
        return await this.workfieldService.create(createWorkfieldDto);
    }
  
    @Get()
    async getAllLicence(): Promise<Workfield[]>{
        return await this.workfieldService.findAll();
    }
  
    @Get('/:id')
    async getCarrerById(
        @Param('id') id :number
    ): Promise<Workfield>{
        return await this.workfieldService.findOneById(id);
    } 
    
    @Put('update/:id')
    async updateAccount(@Param('id') id : number, @Body() updateWorkfieldDto : UpdateWorkfieldDto){
        return await this.workfieldService.update(id,updateWorkfieldDto);
    }
  
    @Delete('delete/:id')
    async deleteAccount(@Param('id') id : number){
        return await this.workfieldService.delete(id);
    }
}