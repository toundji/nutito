/* eslint-disable prettier/prettier */
import { CreateWorkFieldDto } from './../dtos/create-work-field.dto';
import { UpdateWorkFieldDto } from './../dtos/update-work-field.dto';
import { WorkField } from './../entities/work-field.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class WorkFieldService{
    constructor(
        @InjectRepository(WorkField)
        private WorkFieldRepository: Repository<WorkField>
    ){}

    async  findAll(): Promise<WorkField[]>{
        return this.WorkFieldRepository.find();
    }

    async findOneById(id: number): Promise<WorkField>{
        const WorkField = this.WorkFieldRepository.findOneOrFail(id);
        if(WorkField){
            return WorkField;
        }
        throw new HttpException(`WorkField id ${id} not found`, HttpStatus.NOT_FOUND );
    }

    async create(createWorkFieldDto:CreateWorkFieldDto): Promise<WorkField>{
        const newWorkField = await this.WorkFieldRepository.create(createWorkFieldDto);

        return await this.WorkFieldRepository.save(newWorkField);
    }

    async update(id: number, updateWorkFieldDto: UpdateWorkFieldDto): Promise<UpdateResult>{
        return await this.WorkFieldRepository.update(id,updateWorkFieldDto);
    }

    async delete(id : number):Promise<DeleteResult>{
        return await this.WorkFieldRepository.delete(id);
    }
}
   
