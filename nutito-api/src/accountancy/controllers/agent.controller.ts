import { UpdateAccountDto } from './../dtos/update-account.dto';
import { Delete, Param, Post, Put } from '@nestjs/common';
import { CreateAgentDto } from './../dtos/create-agent.dto';
import { AgentService } from './../services/agent.service';
import { Body, Controller, Get } from "@nestjs/common";
import { Agent } from '../entities/agent.entity';

@Controller('agents')
export class AgentController{
    constructor(
        private readonly agentservice : AgentService
    ){}

    @Get()
    async getAgents(): Promise<Agent[]>{
        return this.agentservice.findAll();
    }

    @Get(':id')
    async getAgentById(@Param('id') id: number): Promise<Agent>{
        return await this.agentservice.findOneById(id);
    }

    @Post()
    async createAgent(@Body() createAgentDto: CreateAgentDto): Promise<Agent>{
        return await this.agentservice.create(createAgentDto)
    }

    @Delete(':id')
    async deleteAgent(@Param('id') id){
        return await this.agentservice.delete(id);
    }
}