/* eslint-disable prettier/prettier */
import { CreateClientOperationTypeDto } from './../dtos/create-client-operation-type.dto';
import { UpdateClientOperationTypeDto } from './../dtos/update-client-operation-type.dto';
import { ClientOperationType } from './../entities/client-operation-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ClientChoiceOperationTypeDto } from './../dtos/client-choice-operation.dto';
import { OperationType } from './../entities/operation-type.entity';
import { Company } from '../entities/company.entity';
import { Exception } from 'handlebars';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ClientOpationTypeService{
    constructor(
        @InjectRepository(ClientOperationType)
        private readonly clientOperationTypeRepository : Repository<ClientOperationType>
    ){}

    async findAll():Promise<ClientOperationType[]>{
        return await this.clientOperationTypeRepository.find();
    }

    async findOneById(id:number):Promise<ClientOperationType>{
        const clientoprationtype= await this.clientOperationTypeRepository.findOneOrFail(id);
        if(clientoprationtype){
            return clientoprationtype;
        }
        throw new HttpException('clientoprationtype not found', HttpStatus.NOT_FOUND);
     }

     async create(createClientOperationTypeDto  : CreateClientOperationTypeDto): Promise<ClientOperationType>{
        
        const newClientOperationType = await this.clientOperationTypeRepository.create(createClientOperationTypeDto);
        const company: Company = await Company.findOne(createClientOperationTypeDto.company_id);
         if(company == null){
            throw new BadRequestException("L'entreprise indiquée n'existe pas");
        }
        newClientOperationType.company = company;
        return this.clientOperationTypeRepository.save(newClientOperationType);
     }

     async delete(id: number):Promise<DeleteResult>{
         return await this.clientOperationTypeRepository.delete(id);
     }

     async update(clientOperationType:number,updateClientOperationTypeDto: UpdateClientOperationTypeDto): Promise<UpdateResult>{
         return await this.clientOperationTypeRepository.update(clientOperationType,updateClientOperationTypeDto);
     }
}