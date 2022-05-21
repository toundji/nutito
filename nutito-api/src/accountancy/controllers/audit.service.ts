/* eslint-disable prettier/prettier */
import { AuditService } from './../services/audit.service';
import { Controller, Get, Param } from "@nestjs/common";
import { Audit } from '../entities/audit.entity';

@Controller('audits')
export class AuditController{
    constructor(private readonly auditService: AuditService){}

    @Get()
    async getAudits() : Promise<Audit[]>{
        return await this.auditService.findAll();
    }

    @Get(':id')
    async getOneById(@Param('id') id) : Promise<Audit>{
        return await this.auditService.findOneById(id);
    }
}