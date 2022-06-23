import { UpdateAgentRoleDto } from './../dtos/update-agent-role.dto';
import { CreateAgentRoleDto } from './../dtos/create-agent-role.dto';
import { AgentRoleService } from './../services/agent-role.service';
import { AgentRole } from './../entities/agent-role.entity';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';

@Controller('agent-roles')
@ApiTags('agent-roles')
export class AgentRoleController{
    constructor(
       private readonly agentRoleService: AgentRoleService
    ){}

    
    @Get()
    async getAgents(): Promise<AgentRole[]>{
        return this.agentRoleService.findAll();
    }

    @Get(':id')
    async getOnlyAgentById(@Param('id') id): Promise<AgentRole>{
        return await this.agentRoleService.findOneById(id);
    }

    @Post('/create')
    async createAgentRole(@Body() createAgentRoleDto: CreateAgentRoleDto): Promise<AgentRole>{
        return await this.agentRoleService.create(createAgentRoleDto);
    }

    @Put('update/:id')
    async UpdateAgentROle(@Body() updateAgentRoleDto: UpdateAgentRoleDto, @Param('id') id: number): Promise<any>{
        return await this.agentRoleService.update(id,updateAgentRoleDto)
    }

    @Delete(':id')
    async deleteAgent(@Param('id') id: number){
        return await this.agentRoleService.delete(id);
    }
    
}