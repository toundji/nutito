import { Delete, Param, Post, Put, Req } from '@nestjs/common';
import { AgentService } from './../services/agent.service';
import { Body, Controller, Get } from "@nestjs/common";
import { Agent } from '../entities/agent.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateAgentDto } from '../dtos/create-agent.dto';
import { UpdateAgentAbilityDto } from './../dtos/update-agent-ability.dto';
import { User } from 'src/user/entities/user.entity';


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

    @Post()
    async createAgent(@Body() createAgentDto: CreateAgentDto): Promise<Agent>{
        return await this.agentservice.create(createAgentDto)
    }

    @Put("/abilities")
    async updateAgent(@Body() body: UpdateAgentAbilityDto, @Req() request): Promise<Agent>{
      const user:User = request.user;
        return await this.agentservice.setAgentAbility(body,user);
    }

    // @Put('update/:id')
    // async UpdateAgentROle(@Body() updateagentDto: UpdateAgentDto, @Param('id') id: number): Promise<any>{
    //     return await this.agentservice.update(id,updateagentDto)
    // }

    @Get("that/is/me")
  async getThatIsMe(
    @Req() req,
  ): Promise<Agent[]> {
    const user = req['user'];
    return await this.agentservice.agentThatIsMe(user.id);
  }

  @Get("of/company/:id")
  async ofCompny(
    @Param('id') id: number
  ): Promise<Agent[]> {
    return await this.agentservice.ofCompny(id);
  }

    @Delete(':id')
    async deleteAgent(@Param('id') id){
        return await this.agentservice.delete(id);
    }
}