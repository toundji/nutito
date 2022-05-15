import { UpdateAgentRoleDto } from './../dtos/update-agent-role.dto';
import { CreateAgentRoleDto } from './../dtos/create-agent-role.dto';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AgentRole } from '../entities/agent-role.entity';
@Injectable()
export class AgentRoleService{
    constructor(
        @InjectRepository(AgentRole)
        private readonly agentRoleRepository : Repository<AgentRole>
    ){}


    async findAll() : Promise<AgentRole[]>{
        return await this.agentRoleRepository.find()
    }

    async create(createAgentRoleDto: CreateAgentRoleDto): Promise<AgentRole>{
        const nvagentrole = await this.agentRoleRepository.create(createAgentRoleDto);
        
        return await this.agentRoleRepository.save(nvagentrole);
    }

    async findOneById(id: number): Promise<AgentRole>{
        const result=  await this.agentRoleRepository.findOneOrFail( {where : { id: id}});
        if(result){
            return result;
        }
        throw new NotFoundException(`Agent Role id ${id} not found`);
    }

    async delete(id: number): Promise<DeleteResult>{
        return await this.agentRoleRepository.delete(id);
    }
    async update(id: number,updateAccountDto: UpdateAgentRoleDto): Promise<UpdateResult>{
        return await this.agentRoleRepository.update(id,updateAccountDto);
    }
}