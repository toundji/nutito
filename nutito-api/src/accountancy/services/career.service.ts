import { AgentRoleService } from './agent-role.service';
import { AgentService } from './agent.service';
import { CompanySerice } from './company.service';
import { UpdateCareerDto } from './../dtos/update-career.dto';
import { Career } from './../entities/career.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCareerDto } from './../dtos/create-career.dto';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class careerService{
    constructor(
        @InjectRepository(Career)
        private readonly carrerrRepository: Repository<Career>,
        private readonly companyService : CompanySerice,
        private readonly agentService : AgentService,
        private readonly agentRoleService : AgentRoleService
    ){}

    
     async findAll(): Promise<Career[]>{
        return await this.carrerrRepository.find();
    }

    async findOneById(id : number): Promise<Career >{
        const career  = this.carrerrRepository.findOneOrFail(id);
            if(career){
                return career;
            }
            throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    async create(createCarrerDto : CreateCareerDto): Promise<Career>{
        const newCarrer = new Career();
        // company_id, agent_id, agent_role_id
        const company  = await this.companyService.findOnById(createCarrerDto.company_id);
        const agent = await this.agentService.findOneById(createCarrerDto.agent_role_id);
        const agent_role_id = await this.agentRoleService.findOneById(createCarrerDto.agent_role_id);
        newCarrer.agent = agent;
        newCarrer.company = company;
        newCarrer.role = agent_role_id;

        newCarrer.save();

        return newCarrer;
    }

    async update(career_id : number, updateCarrerDto : UpdateCareerDto): Promise<Career>{
        const updateCareer =  await this.findOneById(career_id);

        const company = updateCarrerDto.company_id ? await this.companyService.findOnById(updateCarrerDto.company_id) : undefined;
        const agent = updateCarrerDto.agent_id ? await this.agentService.findOneById(updateCarrerDto.agent_id) : undefined;
        const agennt_role = updateCarrerDto.agent_role_id ? await this.agentRoleService.findOneById(updateCarrerDto.agent_role_id) : undefined;
        updateCareer.agent = agent;
        updateCareer.role = agennt_role;
        updateCareer.company = company;
        updateCareer.save();

        return updateCareer;
    }

    async delete(id: number): Promise<DeleteResult>{
        return await this.carrerrRepository.softDelete(id);
    }







}