import { ClientOperationType } from './../entities/client-operation-type.entity';
import { ClientOpationTypeService } from './client-operation-type.service';
import { OperationType } from './../entities/operation-type.entity';
import { OperationTypeService } from './operation-type.service';
import { UpdateOperationDto } from './../dtos/update-operation.dto';
import { CreateOperationDto } from './../dtos/create-operation.dto';
import { HttpException, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { Between, DeleteResult, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
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
            newOperation.clientOperationType=  clientOperationType;
        }
        newOperation.company = company;
        const account:Account = company.account;
        if(createOperationDto.type == OperationTypeEnum.IN){
            account.amount = +account.amount+ createOperationDto.amount;
            account.amount_in = +account.amount_in+ createOperationDto.amount;
        }else{
            account.amount = -account.amount+ createOperationDto.amount;
            account.amount_out = +account.amount_out+ createOperationDto.amount;
        }

        newOperation.amount_in = account.amount_in;
        newOperation.amount_out = account.amount_out;
        newOperation.balance = account.amount;
        await Account.save(account);
        return await newOperation.save();
    }

    async edit(id:number, createOperationDto:UpdateOperationDto): Promise<Operation|any>{
        const operation:Operation = await Operation.findOneOrFail(id, {relations:["company", "company.account"]}).catch((error)=>{
            console.log(error);
            throw new NotFoundException("L'opération n'existe pas");
        });
        const newOperation:Operation  = new Operation();
        const old:number = operation.amount;
        let remove: number = 0;
        let add:number = 0;
        const clientOpeType:ClientOperationType = operation.clientOperationType;
        const opeType:OperationType = operation.operationType;
        let newClientOpeType:ClientOperationType ;
        let newOpeType:OperationType;

        
        if(createOperationDto.operation_type_id && createOperationDto.operation_type_id != opeType?.id ){
            // s'ilindique une operation qui est différente de l'ancien
            operation.clientOperationType=null;
            const operationType = await this.operationTypeService.findOnById(createOperationDto.operation_type_id).catch((error)=>{
                throw new BadRequestException("Le type d'opération spécifiée n'existe pas");
            });
            if( operationType.type != operation.type ){
                if(operation.type == OperationTypeEnum.OUT){
                    //si on avait retiré une valeur avant, on ajoute ça
                    add=old;
                }else {
                    //si on avait ajouté une valeur avant, on retire ça
                    remove =0-old;
                }
                if(operationType.type == OperationTypeEnum.OUT){
                    remove = remove -  createOperationDto.amount;
                }else {
                    add = add+  createOperationDto.amount ;
                }
            }else if(createOperationDto.amount && old != createOperationDto.amount){
                if(operation.type == OperationTypeEnum.OUT){
                    // ça veut dire que avant on avait retiré une somme qui
                    // n'est pas ça la veleur normale. donc on ajoute
                    // cette valeur et on retire la noramele
                    add=old;
                    remove =remove -createOperationDto.amount;
                }else {
                     // ça veut dire que avant on avait ajouté une somme qui
                    // n'est pas ça la veleur normale. donc on retire cete
                    // cette valeur et on ajoute la noramele
                    remove =remove-old;
                    add = add+createOperationDto.amount;
                }
                //si meontant change
            }
            newOpeType =  operationType;
            
          }

          if(createOperationDto.client_opration_type_id && createOperationDto.client_opration_type_id!= clientOpeType?.id ){
            // s'ilindique une operation qui est différente de l'ancien
            operation.operationType=null;

            const clientOperationType = await this.clientOpationTypeService.findOneById(createOperationDto.client_opration_type_id).catch((error)=>{
                throw new BadRequestException("Le type d'opération spécifiée n'existe pas");
            });
            if( clientOperationType.type != operation.type ){
                if(operation.type == OperationTypeEnum.OUT){
                    //si on avait retiré une valeur avant, on ajoute ça
                    add=old;
                }else {
                    //si on avait ajouté une valeur avant, on retire ça
                    remove =0-old;
                }
                if(clientOperationType.type == OperationTypeEnum.OUT){
                    remove = remove -  createOperationDto.amount;
                }else {
                    add = add+  createOperationDto.amount ;
                }
            }else if(createOperationDto.amount && old != createOperationDto.amount){
                if(operation.type == OperationTypeEnum.OUT){
                    // ça veut dire que avant on avait retiré une somme qui
                    // n'est pas ça la veleur normale. donc on ajoute
                    // cette valeur et on retire la noramele
                    add=old;
                    remove =remove -createOperationDto.amount;
                }else {
                     // ça veut dire que avant on avait ajouté une somme qui
                    // n'est pas ça la veleur normale. donc on retire cete
                    // cette valeur et on ajoute la noramele
                    remove =remove-old;
                    add = add+createOperationDto.amount;
                }
                //si meontant change
            }
            newClientOpeType =  clientOperationType;
          }
        if(newClientOpeType == null && newOpeType == null){
            if(createOperationDto.amount && old != createOperationDto.amount){
                if(operation.type == OperationTypeEnum.OUT){
                    // ça veut dire que avant on avait retiré une somme qui
                    // n'est pas ça la veleur normale. donc on ajoute
                    // cette valeur et on retire la noramele
                    add=old;
                    remove =remove -createOperationDto.amount;
                }else {
                     // ça veut dire que avant on avait ajouté une somme qui
                    // n'est pas ça la veleur normale. donc on retire cete
                    // cette valeur et on ajoute la noramele
                    remove =remove-old;
                    add = add+createOperationDto.amount;
                }
                //si meontant change
            }
        }
        if(add!=0 || remove!=0){
            let total_in:number = 0;
            let total_out:number = 0;
            if(operation.type == OperationTypeEnum.OUT){
                total_out = 0 - old;
            }else{
                total_in = 0 - old;
            }
            if(createOperationDto.type == OperationTypeEnum.OUT){
                total_out = total_out+ createOperationDto.amount;
            }else{
                total_in = total_in + createOperationDto.amount;
            }
            operation.amount_in = operation.amount_in + total_in;
            operation.amount_out = operation.amount_out + total_out;

            let operations:Operation[] = await Operation.find({where: {company: operation.company, created_at: MoreThan(operation.created_at)}}).catch((error)=>{
                console.log(error);
                throw new InternalServerErrorException("Erreur pendant la mise à jour des opérations après l'opération specifié");
            });
            operations = operations.map(((element:Operation)=>{
                element.balance = element.balance + add + remove;
                element.amount_in =  element.amount_in + total_in;
                element.amount_out =  element.amount_in + total_out;
                element.company = operation.company;
                return element;
            }));
           await Operation.save(operations);
        }
        operation.amount = createOperationDto.amount?? operation.amount;
        operation.balance = operation.balance + add + remove;
        operation.type = createOperationDto.type;
        operation.name = createOperationDto.name;
        operation.clientOperationType = newClientOpeType ?? operation.clientOperationType ;
        operation.operationType = newOpeType ?? operation.operationType;
        await Operation.update(operation.id, operation);
        
        return operation;

        
    }


    async change(id:number, createOperationDto:UpdateOperationDto): Promise<Operation|any>{
        const operation:Operation = await Operation.findOneOrFail(id, {relations:["company", "company.account"]}).catch((error)=>{
            console.log(error);
            throw new NotFoundException("L'opération n'existe pas");
        });
        const newOperation:Operation  = new Operation();
        const old:number = operation.amount;

        const clientOpeType:ClientOperationType = operation.clientOperationType;
        const opeType:OperationType = operation.operationType;
        let newClientOpeType:ClientOperationType ;
        let newOpeType:OperationType;

        let total_in:number = 0;
        let total_out:number = 0;

        if(operation.type == OperationTypeEnum.OUT){
            total_out = 0 - old;
        }else{
            total_in = 0 - old;
        }
        if(createOperationDto.type == OperationTypeEnum.OUT){
            total_out = total_out+ createOperationDto.amount;
        }else{
            total_in = total_in + createOperationDto.amount;
        }

        if(total_in!=0 || total_out!=0){
            let operations:Operation[] = await Operation.find({where: {company: operation.company, created_at: MoreThan(operation.created_at)}}).catch((error)=>{
                console.log(error);
                throw new InternalServerErrorException("Erreur pendant la mise à jour des opérations après l'opération specifié");
            });
            operations = operations.map(((element:Operation)=>{
                element.balance = element.balance + total_in + total_out;
                element.amount_in =  element.amount_in + total_in;
                element.amount_out =  element.amount_in + total_out;
                element.company = operation.company;
                return element;
            }));
           await Operation.save(operations);
        }

        if(createOperationDto.operation_type_id && createOperationDto.operation_type_id != clientOpeType?.id ){
            // s'ilindique une operation qui est différente de l'ancien
            const operationType = await this.operationTypeService.findOnById(createOperationDto.operation_type_id).catch((error)=>{
                throw new BadRequestException("Le type d'opération spécifiée n'existe pas");
            });
            operation.operationType=null;
            newOpeType = operationType;
        }
        if(createOperationDto.client_opration_type_id && createOperationDto.client_opration_type_id!= clientOpeType?.id ){
            // s'ilindique une operation qui est différente de l'ancien
            const clientOperationType = await this.clientOpationTypeService.findOneById(createOperationDto.client_opration_type_id).catch((error)=>{
                throw new BadRequestException("Le type d'opération spécifiée n'existe pas");
            });
            operation.operationType=null;
            newClientOpeType = clientOperationType;
        }

        operation.amount = createOperationDto.amount?? operation.amount;
        operation.balance = operation.balance +total_in + total_out;
        operation.type = createOperationDto.type;
        operation.name = createOperationDto.name;
        operation.amount_out =  operation.amount_out  + total_out;
        operation.amount_in =  operation.amount_in  + total_in;
        operation.clientOperationType = newClientOpeType ?? operation.clientOperationType ;
        operation.operationType = newOpeType ?? operation.operationType;
        await Operation.update(operation.id, operation);
        let account:Account = operation.company.account;
        account.amount =  account.amount +  +total_in + total_out;
        account.amount_in = account.amount_in + total_in;
        account.amount_out = account.amount_out + total_out;
        await Account.update(account.id, account);
        return operation;
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
   
