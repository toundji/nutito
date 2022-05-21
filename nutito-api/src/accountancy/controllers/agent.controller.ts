<<<<<<< HEAD
import { UpdateAccountDto } from './../dtos/update-account.dto';
=======
/* eslint-disable prettier/prettier */
import { updateAgentDto } from './../dtos/update-agent.dto';
>>>>>>> 8e221fab06d8f4d8daab9d86e3e36eafd046b2d5
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

<<<<<<< HEAD
    @Post()
    async createAgent(@Body() createAgentDto: CreateAgentDto): Promise<Agent>{
        return await this.agentservice.create(createAgentDto)
=======
    @Post('/create')
    async createAgent(@Body() createagentdto: CreateAgentDto): Promise<Agent>{
        return await this.agentservice.create(createagentdto)
>>>>>>> 8e221fab06d8f4d8daab9d86e3e36eafd046b2d5
    }
    @Put('update/:id')
    async UpdateAgentROle(@Body() updateagentDto: updateAgentDto, @Param('id') id: number): Promise<any>{
        return await this.agentservice.update(id,updateagentDto)
    }


    @Delete(':id')
    async deleteAgent(@Param('id') id){
        return await this.agentservice.delete(id);
    }
}