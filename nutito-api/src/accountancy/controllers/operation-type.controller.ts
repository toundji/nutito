/* eslint-disable prettier/prettier */
import { OperationType } from './../entities/operation-type.entity';
import { OperationTypeService } from './../services/operation-type.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateOperationTypeDto } from '../dtos/create-operation-type.dto';
import { UpdateOperationTypeDto } from '../dtos/update-operation-type.dto';

@Controller('operations-types')
export class OperationTypeController{
    constructor(private operationTypeService : OperationTypeService){}

    
    @Post('/create')
    async create(@Body() createOperationTypeDto : CreateOperationTypeDto): Promise<any>{
        return await this.operationTypeService.create(createOperationTypeDto);
    }
  
    @Get()
    async getAllLicence(): Promise<OperationType[]>{
        return await this.operationTypeService.findAll();
    }
  
    @Get('/:id')
    async getCarrerById(
        @Param('id') id :number
    ): Promise<OperationType>{
        return await this.operationTypeService.findOnById(id);
    } 
    
    @Put('update/:id')
    async updateAccount(@Param('id') id : number, @Body() updateLicenceDto : UpdateOperationTypeDto){
        return await this.operationTypeService.update(updateLicenceDto, id);
    }
  
    @Delete('delete/:id')
    async deleteAccount(@Param('id') id : number){
        return await this.operationTypeService.delete(id);
    }
}