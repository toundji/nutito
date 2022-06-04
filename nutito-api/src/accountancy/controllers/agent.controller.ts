import { Delete, Param, Post, Put } from '@nestjs/common';
import { AgentService } from './../services/agent.service';
import { Body, Controller, Get } from "@nestjs/common";
import { Agent } from '../entities/agent.entity';
import { CreateAgentDto } from '../dtos/create-agent.dto';
import { UpdateAgentDto } from '../dtos/update-agent.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('agents')
@ApiTags("Agents")
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

    // @Post()
    // async createAgent(@Body() createAgentDto: CreateAgentDto): Promise<Agent>{
    //     return await this.agentservice.create(createAgentDto)
    // }

    // @Put('update/:id')
    // async UpdateAgentROle(@Body() updateagentDto: UpdateAgentDto, @Param('id') id: number): Promise<any>{
    //     return await this.agentservice.update(id,updateagentDto)
    // }


    @Delete(':id')
    async deleteAgent(@Param('id') id){
        return await this.agentservice.delete(id);
    }
}