import { CreateWorkfieldDto } from '../dtos/create-workfield.dto';
import { UpdateWorkfieldDto } from '../dtos/update-workfield.dto';
import { Workfield } from '../entities/workfield.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { faker } from "@faker-js/faker"

@Injectable()
export class WorkfieldService{
    constructor(
        @InjectRepository(Workfield)
        private WorkfieldRepository: Repository<Workfield>
    ){}

    async  findAll(): Promise<Workfield[]>{
        return this.WorkfieldRepository.find();
    }

    async  findByName(name:string): Promise<Workfield[]>{
        return this.WorkfieldRepository.find({where:{name: name }});
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


    async init():Promise<Workfield[]>{
        const olds:Workfield[]= await this.WorkfieldRepository.find();
        if(olds && olds.length > 0){
            console.log(olds);
            return olds;
          }
                    const fields = [
                {
                    name: "Informaticien",
                    description: faker.lorem.lines(3),
                },
                {
                    name: "Restauration",
                    description: faker.lorem.lines(3),
                },
                {
                    name: "Pharmaticien",
                    description: faker.lorem.lines(3),
                },
                {
                    name: "Commerçante",
                    description: faker.lorem.lines(3),
                },
                {
                    name: "Transport",
                    description: faker.lorem.lines(3),
                },
            ];
            const l =  this.WorkfieldRepository.create(fields);
            return this.WorkfieldRepository.save(l);
    }
}
   
