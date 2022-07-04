import { UpdateAgentDto } from './../dtos/update-agent.dto';
import { UserService } from './../../user/services/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Agent } from '../entities/agent.entity';
import { CreateAgentDto } from '../dtos/create-agent.dto';
import { Company } from '../entities/company.entity';
import { User } from 'src/user/entities/user.entity';
import { AgentRole } from './../entities/agent-role.entity';


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
         const agent = await this.agentsRepository.findOneOrFail({ where: { id: id } }).catch(
            (error) => {
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

}