import { CreateOperationTypeDto } from './../dtos/create-operation-type.dto';
import { OperationType } from './../entities/operation-type.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Injectable, NotFoundException, Catch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOperationTypeDto } from '../dtos/update-operation-type.dto';
import { faker } from "@faker-js/faker"
import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';
import { WorkfieldService } from './workfield.service';
import { Workfield } from './../entities/workfield.entity';

@Injectable()
export class OperationTypeService{
    constructor(
        @InjectRepository(OperationType)
        private readonly OperationTypeRepository : Repository<OperationType>,
        private readonly workfieldService: WorkfieldService
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

    async create(operationTypeCreateDto : CreateOperationTypeDto): Promise<any>{
        const op: OperationType = new OperationType();
        Object.keys(operationTypeCreateDto).forEach((key)=>{
            op[key] = operationTypeCreateDto[key];
        });
        op.workfields = await  Workfield.findByIds(operationTypeCreateDto.workField_ids);
       return await this.OperationTypeRepository.save(op);
    }

    async update(updateOperationTypeDto: UpdateOperationTypeDto, id:number):Promise<UpdateResult>{
        const op: OperationType =await  this.findOnById(id);
        Object.keys(updateOperationTypeDto).forEach((key)=>{
            op[key] = updateOperationTypeDto[key];
        });
        op.workfields = await  Workfield.findByIds(updateOperationTypeDto.workField_ids);
        return await this.OperationTypeRepository.update(id,op);
    }
    findByType(type:OperationTypeEnum){
        return this.OperationTypeRepository.find({where:{type: type}});
    }


    async findByWorkField(field_id:number){
        const field:Workfield = await Workfield.findOne(field_id,{
            relations:["operationTypes"],
        });


        return field.operationTypes;
    }

    async findByTypeAndField(type:OperationTypeEnum, field_id:number):Promise<OperationType[]>{
        const field:Workfield = await Workfield.findOne(field_id, {

            relations:["operationTypes"],
        });
        return field.operationTypes.filter((element)=>element.type == type);
    }


    async init(): Promise<OperationType[]>{

        const workFileds:Workfield[] = await this.workfieldService.findByName("Restauration");
        const olds:OperationType[]=  await this.OperationTypeRepository.find();
        if(olds && olds.length > 0){
            console.log(olds);

            return olds;
          }
    
            const fields = [
                {
                    type: OperationTypeEnum.OUT,
                    name:"Payement du loyer",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.OUT,
                    name: "Payement de l'électricité",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.OUT,
                    name:"Payement de l'eau",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.IN,
                    name: "Vente",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.IN,
                    name: "Vente de Jue",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.OUT,
                    name: "Achat de Jue",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.IN,
                    name: "Vente de riz",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.OUT,
                    name: "Achat du riz",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.IN,
                    name: "Vente de patte",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.OUT,
                    name: "Achat de mais",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.IN,
                    name: "Vente d'arricot",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.OUT,
                    name: "Achat d'arricot",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },

                {
                    type: OperationTypeEnum.IN,
                    name: "Vente de lait",
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.OUT,
                    name: "Achat de lait",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.IN,
                    name: "Vente de agou",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
                {
                    type: OperationTypeEnum.OUT,
                    name: "Achat d'igname",
                    workfields: workFileds,
                    description: faker.lorem.lines(3),
                },
            ];
            const l =  this.OperationTypeRepository.create(fields);
            return this.OperationTypeRepository.save(l);
        
    }

}