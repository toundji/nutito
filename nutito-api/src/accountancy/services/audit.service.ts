import { AuditUpdateDto } from './../dtos/update-audit.dto';
import { AuditDto } from './../dtos/create-audit.dto';
import { Repository, DeleteResult } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Audit } from '../entities/audit.entity';

@Injectable()
export class AuditService{
    constructor(
        @InjectRepository(Audit)
        private readonly audiRepository: Repository<Audit>,
     ){}

     async findAll(): Promise<Audit[]>{
         return await this.audiRepository.find();
     }

     async findAllByAgent(): Promise<Audit[]>{
        return await this.audiRepository.find();
    }

     async findOneById(id:number):Promise<Audit>{
        const audit= await this.audiRepository.findOneOrFail(id);
        if(audit){
            return audit;
        }
        throw new HttpException('Audit not found', HttpStatus.NOT_FOUND);
     }

     async delete(id:number):Promise<DeleteResult>{
        const audit= await this.audiRepository.findOneOrFail(id);
        if(audit){
            await this.audiRepository.softDelete(id);
        }
        throw new HttpException('Audit not found', HttpStatus.NOT_FOUND);
     }
     async create(audit: AuditDto): Promise<Audit>{
        const newAudit= await this.audiRepository.create(audit);
        return await this.audiRepository.save(newAudit);

     }

     async update(idAudit: any, auditForUpdate: AuditUpdateDto): Promise<Audit>{
        await this.audiRepository.update(auditForUpdate, idAudit)
            const result= this.audiRepository.findOneOrFail(idAudit);
        if(result){
            return result;
        }

        throw new HttpException('Audit not found',HttpStatus.NOT_FOUND);

     }


}