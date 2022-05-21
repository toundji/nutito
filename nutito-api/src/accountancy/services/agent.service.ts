/* eslint-disable prettier/prettier */
import { UpdateAgentDto } from './../dtos/update-agent.dto';
import { UserService } from './../../user/services/user.service';
import { CreateAgentDto } from './../dtos/create-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Agent } from '../entities/agent.entity';


@Injectable()
export class AgentService{
    constructor(
        @InjectRepository(Agent)
        private readonly agentsRepository: Repository<Agent>,
        private userService: UserService
      ) { }

      findAll(): Promise<Agent[]> {
        return this.agentsRepository.find();
      }


      async findOneById(id: number): Promise<Agent>{
         const agent = await this.agentsRepository.findOneOrFail({ where: { id: id } }).catch(
            (error) => {
                throw new NotFoundException(`Agent with id ${id} is not found`);
            }
         );
         return agent;
         
      }

      async create(createAgentDto: CreateAgentDto): Promise<Agent> {
        const agent = new Agent();
        Object.keys(createAgentDto).forEach(
          attribute => agent[attribute] = createAgentDto[attribute]
        );
        const  user = await this.userService.findOneById(createAgentDto.user_id); 
        agent.user = user;
        const newAgent = agent.save().catch(
          (error) => {
            throw new BadRequestException({ error: `${error}` });
          }
        );
        return newAgent;
      }

      async delete(id: number): Promise<DeleteResult>{
          return await this.agentsRepository.softDelete(id);
      }

      async update(agentId: number, updateAgentDto: UpdateAgentDto): Promise<Agent>{
        const agent =  await this.findOneById(agentId);
        const user = updateAgentDto.user_id ? await this.userService.findOneById(updateAgentDto.user_id) : undefined;
        agent.user = user ? user : agent.user;
        agent.save();
        return agent;
      }

    

    
}