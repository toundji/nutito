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
        private workfieldRepository: Repository<Workfield>
    ){}

    async  findAll(): Promise<Workfield[]>{
        return this.workfieldRepository.find();
    }

    async  findByName(name:string): Promise<Workfield[]>{
        return this.WorkfieldRepository.find({where:{name: name }});
    }
    async findOneById(id: number): Promise<Workfield>{
        const workfield = this.workfieldRepository.findOneOrFail(id);
        if(workfield){
            return workfield;
        }
        throw new HttpException(`Workfield id ${id} not found`, HttpStatus.NOT_FOUND );
    }

    async create(createWorkfieldDto: CreateWorkfieldDto): Promise<Workfield>{
        const newWorkfield = this.workfieldRepository.create(createWorkfieldDto);
        console.log(newWorkfield)
        return await this.workfieldRepository.save(newWorkfield);
    }

    async update(id: number, updateWorkfieldDto: UpdateWorkfieldDto): Promise<UpdateResult>{
        return await this.workfieldRepository.update(id,updateWorkfieldDto);
    }

    async delete(id : number):Promise<DeleteResult>{
        return await this.workfieldRepository.delete(id);
    }


<<<<<<< HEAD
    init():Promise<Workfield[]>{
        return this.workfieldRepository.find().then((olds)=>{
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
                const l =  this.workfieldRepository.create(fields);
                return this.workfieldRepository.save(l);
            
        })
        
=======
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
>>>>>>> 9aaedc9d5ca99de029081d2d8b216b041480d5d4
    }
}
   
