/* eslint-disable prettier/prettier */
import { CreateWorkfieldDto } from '../dtos/create-workfield.dto';
import { UpdateWorkfieldDto } from '../dtos/update-workfield.dto';
import { Workfield } from '../entities/workfield.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class WorkfieldService{
    constructor(
        @InjectRepository(Workfield)
        private WorkfieldRepository: Repository<Workfield>
    ){}

    async  findAll(): Promise<Workfield[]>{
        return this.WorkfieldRepository.find();
    }

    async findOneById(id: number): Promise<Workfield>{
        const Workfield = this.WorkfieldRepository.findOneOrFail(id);
        if(Workfield){
            return Workfield;
        }
        throw new HttpException(`Workfield id ${id} not found`, HttpStatus.NOT_FOUND );
    }

    async create(createWorkfieldDto:CreateWorkfieldDto): Promise<Workfield>{
        const newWorkfield = await this.WorkfieldRepository.create(createWorkfieldDto);

        return await this.WorkfieldRepository.save(newWorkfield);
    }

    async update(id: number, updateWorkfieldDto: UpdateWorkfieldDto): Promise<UpdateResult>{
        return await this.WorkfieldRepository.update(id,updateWorkfieldDto);
    }

    async delete(id : number):Promise<DeleteResult>{
        return await this.WorkfieldRepository.delete(id);
    }
}
   
