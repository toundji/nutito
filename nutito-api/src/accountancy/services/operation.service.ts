/* eslint-disable prettier/prettier */
import { ClientOperationType } from './../entities/client-operation-type.entity';
import { ClientOpationTypeService } from './client-operation-type.service';
import { OperationType } from './../entities/operation-type.entity';
import { OperationTypeService } from './operation-type.service';
import { UpdateOperationDto } from './../dtos/update-operation.dto';
import { CreateOperationDto } from './../dtos/create-operation.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Operation } from '../entities/operation.entity';
//https://www.codemag.com/Article/1907081/Nest.js-Step-by-Step
//https://www.codemag.com/Article/1909081/Nest.js-Step-by-Step-Part-2

//https://www.codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication

@Injectable()
export class OperationService{
    constructor(
        @InjectRepository(Operation)
        private readonly operationRepository: Repository<Operation>,
        private readonly operationTypeService : OperationTypeService,
        private readonly clientOpationTypeService: ClientOpationTypeService
    ){}

    async  findAll(): Promise<Operation[]>{
        return this.operationRepository.find();
    }

    async findOneById(id: number): Promise<Operation>{
        const operation = this.operationRepository.findOneOrFail(id);
        if(operation){
            return operation;
        }
        throw new HttpException(`Operation id ${id} not found`, HttpStatus.NOT_FOUND );
    }

    async create(createOperationDto:CreateOperationDto): Promise<Operation>{
        const newOPeration = new Operation();
        const operationType = await this.operationTypeService.findOnById(createOperationDto.operation_type_id);
        const clientOperationType = await this.clientOpationTypeService.findOneById(createOperationDto.client_opration_type_id);

        newOPeration.client_operation_type.id=  clientOperationType.id;
        newOPeration.operation_type.id =  operationType.id;

        return newOPeration.save()
    }

    async update(id: number, updateOperationDto: UpdateOperationDto): Promise<Operation>{
        const operation = await this.findOneById(id);
        operation.client_operation_type.id = updateOperationDto.client_opration_type_id ? updateOperationDto.client_opration_type_id : undefined;
        operation.operation_type.id = updateOperationDto.operation_type_id ? updateOperationDto.operation_type_id : undefined ;
        return await this.operationRepository.save(operation);
    }

    async delete(id : number):Promise<DeleteResult>{
        return await this.operationRepository.delete(id);
    }
}
   
