import { OperationService } from './../services/operation.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateOperationDto } from '../dtos/create-operation.dto';
import { Operation } from '../entities/operation.entity';
import { UpdateOperationDto } from '../dtos/update-operation.dto';

@Controller('operations')
export class OperationController{
    constructor(private operationService : OperationService){}

    
    @Post('/create')
    async create(@Body() createOperationDto : CreateOperationDto): Promise<Operation>{
        return await this.operationService.create(createOperationDto);
    }
  
    @Get()
    async getAll(): Promise<Operation[]> {
        return await this.operationService.findAll();
    }
  
    @Get('/:id')
    async getById(
        @Param('id') id :number
    ): Promise<Operation> {
        return await this.operationService.findOneById(id);
    } 
    
    @Put('update/:id')
    async update(@Param('id') id : number, @Body() updateOperationDto : UpdateOperationDto) {
        return await this.operationService.update(id,updateOperationDto);
    }
  
    @Delete('delete/:id')
    async delete(@Param('id') id : number){
        return await this.operationService.delete(id);
    }
}