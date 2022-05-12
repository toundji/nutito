/* eslint-disable prettier/prettier */
import { CreateOperationTypeDto } from './../dtos/create-operation-type.dto';
import { OperationType } from './../entities/operation-type.entity';
import { Slugger } from 'src/utilities/helpers/slugger.helper';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Injectable, NotFoundException, Catch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { retry } from 'rxjs';
import { UpdateOperationTypeDto } from '../dtos/update-operation-type.dto';
@Injectable()
export class OperationTypeService{
    constructor(
        @InjectRepository(OperationType)
        private readonly OperationTypeRepository : Repository<OperationType>,
        private readonly slugger: Slugger
    ){}

    async findAll(): Promise<OperationType[]>{
        return await this.OperationTypeRepository.find();
    }

    async findOnById(id: number): Promise<OperationType>{
      

         const companny = await this.OperationTypeRepository.findOneOrFail({where : { id : id}}).catch(
            (error)=> {
                throw new NotFoundException(`OperationType with id ${id} is not found`);
            }
         )
         return companny;

    }

    async delete(id :number): Promise<DeleteResult>{
        return  this.OperationTypeRepository.softDelete(id);

    }

    async create(OperationTypeCreateDto : CreateOperationTypeDto): Promise<any>{
       const newOperationType= await this.OperationTypeRepository.create(OperationTypeCreateDto);
       return await this.OperationTypeRepository.save(newOperationType);
        

    }

    async update(updateOperationTypeDto: UpdateOperationTypeDto, id:number):Promise<UpdateResult>{
        return await this.OperationTypeRepository.update(id,updateOperationTypeDto);
    }

}