/* eslint-disable prettier/prettier */
import { UpdateClientOperationTypeDto } from './../dtos/update-client-operation-type.dto';
import { CreateClientOperationTypeDto } from './../dtos/create-client-operation-type.dto';
import { Delete, Param, Post, Body, Put } from '@nestjs/common';
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
    async createOperaType(@Body() createClientOperationTypeDto: CreateClientOperationTypeDto): Promise<ClientOperationType>{
        return await this.clientOpationTypeService.create(createClientOperationTypeDto)
    }
    @Put("/update/:id")
    async updateOperaType(@Body() updateClientOperationTypeDto: UpdateClientOperationTypeDto, id:number): Promise<any>{
        return await this.clientOpationTypeService.update(id,updateClientOperationTypeDto)
    }

    @Delete('/:id')
    async deleteOpreaType(@Param('id') id : number){
        return await this.clientOpationTypeService.delete(id);
    }
}