import { UpdateAgentDto } from './../dtos/update-agent.dto';
import { UserService } from './../../user/services/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Agent } from '../entities/agent.entity';
import { CreateAgentDto } from '../dtos/create-agent.dto';
import { Company } from '../entities/company.entity';
import { User } from 'src/user/entities/user.entity';
import { AgentRole } from './../entities/agent-role.entity';
import { UpdateAgentAbilityDto } from './../dtos/update-agent-ability.dto';
import { Ability } from '@casl/ability';
import { ActionEnum } from 'src/utilities/enums/actions.enum';


@Injectable()
export class AgentService{
    constructor(
        @InjectRepository(Agent)
        private readonly agentsRepository: Repository<Agent>,
      ) { }

      findAll(): Promise<Agent[]> {
        return this.agentsRepository.find();
      }


      async findOneById(id: number): Promise<Agent>{
         const agent = await this.agentsRepository.findOneOrFail(id,{  relations:["user", "company"]}).catch(
            (error) => {
              console.log(error);
                throw new NotFoundException(`Agent with id ${id} is not found`);
            }
         );
         return agent;
      }

      async create(createAgentDto: CreateAgentDto): Promise<Agent> {
        const  user = await User.findOneOrFail(createAgentDto.user_id).catch((error)=>{
          throw new BadRequestException("L'utilisateur n'existe pas");
        }); 
        const  company:Company = await Company.findOneOrFail(createAgentDto.company_id).catch((error)=>{
          throw new BadRequestException("L'entrepise n'existe pas");
        }); 
        const  role:AgentRole = await AgentRole.findOneOrFail(createAgentDto.role_id).catch((error)=>{
          throw new BadRequestException("Le role n'existe pas");
        });

        const agent: Agent = Agent.create({
          role: role,
          user:user,
          company:company,
          abilities: createAgentDto.abilities
        });

        return await agent.save().catch(
          (error) => {
            throw new BadRequestException({ error: `${error}` });
          }
        );
      }

      async delete(id: number): Promise<DeleteResult>{
          return await this.agentsRepository.softDelete(id);
      }

      async update(agentId: number, updateAgentDto: UpdateAgentDto): Promise<Agent>{
        return
      }

      agentThatIsMe(id:number): Promise<Agent[]> {
        const user:User = User.create({id:id});
        return this.agentsRepository.find({where:{user:user}, relations:["company"]}).catch((error)=>{
            console.log("Erreur ");
            throw new NotFoundException();
          });
      }

      ofCompny(id:number): Promise<Agent[]> {
        const company:Company = Company.create({id:id});
        return this.agentsRepository.find({where:{company:company}}).catch((error)=>{
            console.log("Erreur ", error);
            throw new NotFoundException();
          });
      }

      async setAgentAbility(body:UpdateAgentAbilityDto, user:User){
        const editor:Agent = await this.findOneById(body.manager_id);
        if(!editor.abilities.includes(ActionEnum.Manage) || editor.user.id != user.id){
          throw new UnauthorizedException("Vous n'êtes pas autorisiés à éffectuer cette opération");
        }
        const agent:Agent = await this.agentsRepository.findOneOrFail(body.agent_id,{  relations:["company"] }).catch((error) => {throw new NotFoundException(`Agent with id ${body.agent_id} is not found`);});
       if(agent.company.id != editor.company.id){
        throw new UnauthorizedException("Vous n'êtes pas autorisiés à éffectuer cette opération");
       }
       agent.abilities = body.abilities;
       await Agent.save(agent);
       return agent;
      }

}