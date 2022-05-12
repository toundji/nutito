/* eslint-disable prettier/prettier */
import { updateAgentDto } from './../dtos/update-agent.dto';
import { UserService } from './../../user/services/user.service';
import { CreateAgentDto } from './../dtos/create-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Slugger } from 'src/utilities/helpers/slugger.helper';
import { Agent } from '../entities/agent.entity';


@Injectable()
export class AgentService{
    constructor(
        @InjectRepository(Agent)
        private readonly agentrepository: Repository<Agent>,
        private readonly slugger: Slugger,
        private userService: UserService
      ) { }

      findAll(): Promise<Agent[]> {
        return this.agentrepository.find();
      }


      async findOneById(id: number): Promise<Agent>{
         const agent = await this.agentrepository.findOneOrFail({ where: { id: id } }).catch(
            (error) => {
                throw new NotFoundException(`Agent with id ${id} is not found`);
            }
         );
         return agent;
         
      }

      async create(createAgentDto :CreateAgentDto): Promise<Agent> {
        
        const newAgent = new Agent();
        const  user = await this.userService.findOneById(createAgentDto.user_id); //presence d'une relation
        newAgent.user = user.id;
        newAgent.save();
        return newAgent;
      }

      async delete(id: number): Promise<DeleteResult>{
          
          return await this.agentrepository.softDelete(id);
      }

      async update(agentId: number, updateAgentDto: updateAgentDto): Promise<Agent>{
        const agent =  await this.findOneById(agentId);

        const user = updateAgentDto.user_id ? await this.userService.findOneById(updateAgentDto.user_id) : undefined;
        agent.user = user ? user : agent.user;
        
        agent. save();
        return agent;

      }

    

    
}