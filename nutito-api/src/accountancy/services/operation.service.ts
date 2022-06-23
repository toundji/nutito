import { ClientOperationType } from './../entities/client-operation-type.entity';
import { ClientOpationTypeService } from './client-operation-type.service';
import { OperationType } from './../entities/operation-type.entity';
import { OperationTypeService } from './operation-type.service';
import { UpdateOperationDto } from './../dtos/update-operation.dto';
import { CreateOperationDto } from './../dtos/create-operation.dto';
import { HttpException, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { Between, DeleteResult, Repository } from 'typeorm';
import { Operation } from '../entities/operation.entity';
import { Company } from './../entities/company.entity';
import { BadRequestException } from '@nestjs/common';
import { Account } from './../entities/account.entity';
import { OperationTypeEnum } from 'src/utilities/enums/operation-type.enum';
import { OperationByPeriodeDto } from '../dtos/operation-by-periode.dto';
import { OperationRespoDto } from '../dtos/responses/operation-respo.dto';



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

    async  findAllForCompany(company_id: number): Promise<Operation[]>{
        const company:Company = Company.create({id:company_id});
        return this.operationRepository.find({where:{company:company}});
    }

    async  findAllForCompanyByPeriode(periode: OperationByPeriodeDto): Promise<OperationRespoDto>{
        const company:Company = Company.create({id:periode.company_id});
        periode.from_date ??= new Date();
        
        const operations :Operation[] =await  this.operationRepository.find({where:{
                company:company,
                // created_at: Between(periode.from_date, periode.from_date),
                
                },
             }).catch((error)=>{
                    throw new BadRequestException("Une erreur s'est produit pendant le traitement de votre requète");
                });
                console.log(operations);
        if( operations.length == 0){
            throw new NotFoundException("Vous n'avez effectere aucune opération dans cette période")
        }
        let debut_tresorerie: Operation = await   this.operationRepository.createQueryBuilder("ope").
        where("ope.company_id = :id", {id: periode.company_id})
        .andWhere("ope.created_at < :date", {date: periode.from_date})
        .orderBy("ope.created_at", "DESC")
        .limit(1)
        .getRawOne().catch((error)=>{
            console.log(error);
            throw new InternalServerErrorException("Vous n'avez effectere aucune opération dans cette période")
        });
        if(!debut_tresorerie){
            debut_tresorerie = operations[0];
        }
        const fin_tresorerie: Operation =  operations[operations.length-1];
        const response: OperationRespoDto = {
                from_date: periode.from_date,

                to_date: periode.to_date,

                company: company,

                start_balence: debut_tresorerie.balance,

                end_balence: fin_tresorerie.balance,

                operations: operations,
        }
        return response;
    }

    async findOneById(id: number): Promise<Operation>{
        const operation = this.operationRepository.findOneOrFail(id);
        if(operation){
            return operation;
        }
        throw new HttpException(`Operation id ${id} not found`, HttpStatus.NOT_FOUND );
    }

    async create(createOperationDto:CreateOperationDto): Promise<Operation>{
        const newOperation = new Operation();

        const company = await Company.findOne(createOperationDto.company_id).catch((error)=>{
            throw new BadRequestException("L'entreprise spécifiée n'existe pas");
        });

        Object.keys(createOperationDto).forEach(
            attribute => newOperation[attribute] = createOperationDto[attribute]
          );
          if(createOperationDto.operation_type_id){
            const operationType = await this.operationTypeService.findOnById(createOperationDto.operation_type_id).catch((error)=>{
                throw new BadRequestException("Le type d'opération spécifiée n'existe pas");
            });    
            newOperation.operationType =  operationType;
          }
          if(createOperationDto.client_opration_type_id){
            const clientOperationType = await this.clientOpationTypeService.findOneById(createOperationDto.client_opration_type_id).catch((error)=>{
                throw new BadRequestException("Le type d'opération spécifiée n'existe pas");
            });
            newOperation.clientOperationType.id=  clientOperationType.id;
        }
        newOperation.company = company;
        const account:Account = company.account;
        if(createOperationDto.type == OperationTypeEnum.IN){
            account.amount = +account.amount+ createOperationDto.amount;
            account.amount_in = +account.amount_in+ createOperationDto.amount;
        }else{
            account.amount = +account.amount+ createOperationDto.amount;
            account.amount_out = +account.amount_out+ createOperationDto.amount;
        }

        newOperation.amount_in = account.amount_in;
        newOperation.amount_out = account.amount_out;
        newOperation.balance = account.amount;
        await Account.save(account);
        return await newOperation.save();
    }

    async update(id: number, updateOperationDto: UpdateOperationDto): Promise<Operation>{
        const operation = await this.findOneById(id);
        operation.clientOperationType.id = updateOperationDto.client_opration_type_id ? updateOperationDto.client_opration_type_id : undefined;
        operation.clientOperationType.id = updateOperationDto.operation_type_id ? updateOperationDto.operation_type_id : undefined ;
        return await this.operationRepository.save(operation);
    }

    async delete(id : number):Promise<DeleteResult>{
        return await this.operationRepository.delete(id);
    }
}
   
