import { OperationType } from './../entities/operation-type.entity';
import { OperationTypeService } from './../services/operation-type.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateOperationTypeDto } from '../dtos/create-operation-type.dto';
import { UpdateOperationTypeDto } from '../dtos/update-operation-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';
import { Workfield } from './../entities/workfield.entity';

@Controller('operations-types')
@ApiTags("Les types d'operations")
export class OperationTypeController{
    constructor(private operationTypeService : OperationTypeService){}

    @Post('/create')
    async create(@Body() createOperationTypeDto : CreateOperationTypeDto): Promise<any>{
        return await this.operationTypeService.create(createOperationTypeDto);
    }

    @Get()
    async getAllOperationType(): Promise<OperationType[]>{
        return await this.operationTypeService.findAll();
    }

    @Get('/:id')
    async getOperationTypeById(
        @Param('id') id :number
    ): Promise<OperationType>{
        return await this.operationTypeService.findOnById(id);
    }

    @Get('types/:type')
    async getOperationTypeByType(
        @Param('type') type :OperationTypeEnum
    ): Promise<OperationType[]>{
        return await this.operationTypeService.findByType(type);
    }

    @Get('types/:type/workfield/:field')
    async getOperationTypeByTypeAndField(
        @Param('type') type :OperationTypeEnum,
        @Param('field') field :number
    ): Promise<OperationType[]>{
        return await this.operationTypeService.findByTypeAndField(type, field);
    }

    @Get('workfield/:field')
    async getOperationTypeByFIelield(
        @Param('field') field :number
    ): Promise<OperationType[]>{
        return await this.operationTypeService.findByWorkField(field);
    }

    @Put('update/:id')
    async update(@Param('id') id : number, @Body() updateLicenceDto : UpdateOperationTypeDto){
        return await this.operationTypeService.update(updateLicenceDto, id);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id : number){
        return await this.operationTypeService.delete(id);
    }

    @Get('init/all')
    init():Promise<OperationType[]>{
        return this.operationTypeService.init();
    }
}