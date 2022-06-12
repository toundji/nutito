/* eslint-disable prettier/prettier */
import { UpdateAgentRoleDto } from './../dtos/update-agent-role.dto';
import { CreateAgentRoleDto } from './../dtos/create-agent-role.dto';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { faker } from "@faker-js/faker"


import { AgentRole } from '../entities/agent-role.entity';
import { agent } from 'supertest';
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

    async findOneByName(name: string): Promise<AgentRole>{
        const result = await this.agentRoleRepository.findOneOrFail( {where : { name: name }}).catch(
            (error) => {
                throw new NotFoundException(`Agent Role with name ${name} was not found`);
            }
        );
        return result;
    }

    async delete(id: number): Promise<DeleteResult>{
        const agentRole = await this.findOneById(id);
        if(agentRole.id){
            return this.agentRoleRepository.delete(agentRole);
        }
        throw new NotFoundException(`Agent Role id ${id} not found`);


    }
    async update(id: number,updateAccountDto: UpdateAgentRoleDto): Promise<UpdateResult>{
        return await this.agentRoleRepository.update(id,updateAccountDto);
    }


    init(){
        return this.agentRoleRepository.find().then((olds:AgentRole[]) =>{
            if(olds && olds.length > 0){
                console.log(olds);
                return olds;
              }                const agentData = [
                    {
                        name: "AGENT",
                        description: faker.lorem.lines(3),
                    },
                    {
                        name: "COMPTABLE",
                        description: faker.lorem.lines(3),
                    },
                    {
                        name: "SECRÉTAIRE",
                        description: faker.lorem.lines(3),
                    },
                    {
                        name: "DIRECTEUR TECHNIQUE",
                        description: faker.lorem.lines(3),
                    },
                    {
                        name:  "DIRECTEUR GÉNÉRAL",
                        description: faker.lorem.lines(3),
                    },
                    {
                        name:  "CREATEUR SUR NUTITO",
                        description: faker.lorem.lines(3),
                    }

                ];
                const agents :AgentRole[] = this.agentRoleRepository.create(agentData);
                return this.agentRoleRepository.save(agents);
        })
    }
}