/* eslint-disable prettier/prettier */
import { OperationService } from './../services/operation.service';
import { OperationType } from './../entities/operation-type.entity';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateOperationDto } from '../dtos/create-operation.dto';
import { Operation } from '../entities/operation.entity';
import { UpdateOperationDto } from '../dtos/update-operation.dto';

@Controller('operations')
export class OperationTypeController{
    constructor(private operationService : OperationService){}

    
    @Post('/create')
    async create(@Body() createOperationDto : CreateOperationDto): Promise<Operation>{
        return await this.operationService.create(createOperationDto);
    }
  
    @Get()
    async getAllLicence(): Promise<OperationType[]>{
        return await this.operationService.findAll();
    }
  
    @Get('/:id')
    async getCarrerById(
        @Param('id') id :number
    ): Promise<OperationType>{
        return await this.operationService.findOneById(id);
    } 
    
    @Put('update/:id')
    async updateAccount(@Param('id') id : number, @Body() updateOperationDto : UpdateOperationDto){
        return await this.operationService.update(id,updateOperationDto);
    }
  
    @Delete('delete/:id')
    async deleteAccount(@Param('id') id : number){
        return await this.operationService.delete(id);
    }
}