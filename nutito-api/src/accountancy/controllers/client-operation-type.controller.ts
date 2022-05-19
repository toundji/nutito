/* eslint-disable prettier/prettier */
import { CreateClientOperationDto } from './../dtos/create-client-operation-type.dto';
import { Delete, Param, Post, Body } from '@nestjs/common';
import { ClientOperationType } from './../entities/client-operation-type.entity';
import { ClientOpationTypeService } from './../services/client-operation-type.service';
import { Controller, Get } from "@nestjs/common";

@Controller('client-operation-type')
export class ClientOpationTypeController{
    constructor(
        private clientOpationTypeService: ClientOpationTypeService
    ){}

    
    @Get()
    async getAllClientOperationType(): Promise<ClientOperationType[]>{
        return this.clientOpationTypeService.findAll();
    }

    @Get('/:id')
    async getOnlyClientOperationTypeById(@Param('id') id): Promise<ClientOperationType>{
        return await this.clientOpationTypeService.findOneById(id);
    }

    @Post("/create")
    async createAgent(@Body() createClientOperationDto: CreateClientOperationDto): Promise<ClientOperationType>{
        return await this.clientOpationTypeService.create(createClientOperationDto)
    }

    @Delete(':id')
    async deleteAgent(@Param('id') id){
        return await this.clientOpationTypeService.delete(id);
    }
}