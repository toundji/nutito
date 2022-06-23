import { ClientOpationTypeService } from './../services/client-operation-type.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { ClientOperationType } from '../entities/client-operation-type.entity';
import { CreateClientOperationTypeDto } from '../dtos/create-client-operation-type.dto';
import { ClientChoiceOperationTypeDto } from '../dtos/client-choice-operation.dto';

@Controller('clients-operations')
@ApiTags("Les operations du client")
export class ClientOperationController{
    constructor(private clientOperationService : ClientOpationTypeService){}

    @Post()
    async create(@Body() createClientOperationTypeDto: CreateClientOperationTypeDto): Promise<ClientOperationType>{
        return await this.clientOperationService.create(createClientOperationTypeDto);
    }

    @Get()
     getAll(): Promise<ClientOperationType[]>{
        return  this.clientOperationService.findAll();
    }

    @Get('/:id')
    async getById(
        @Param('id') id :number
    ): Promise<ClientOperationType>{
        return await this.clientOperationService.findOneById(id);
    }

    // @Put('update/:id')
    // async update(@Param('id') id : number, @Body() updateLicenceDto : UpdateClientOperationTypeDto){
    //     return await this.clientOperationService.update(updateLicenceDto, id);
    // }

    @Delete('delete/:id')
    async delete(@Param('id') id : number){
        return await this.clientOperationService.delete(id);
    }
}