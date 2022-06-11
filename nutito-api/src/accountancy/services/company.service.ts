/* eslint-disable prettier/prettier */
import { CompanyCategoryService } from './company-category.service';
import { UpdateCompanyDto } from './../dtos/update-company.dto';
import { CreateCompanyDto } from './../dtos/create-company.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Company } from './../entities/company.entity';
import { Injectable, NotFoundException, Catch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/services/user.service';
import { CreateAgentDto } from '../dtos/create-agent.dto';
import { AgentRoleService } from './agent-role.service';
import { AgentRole } from '../entities/agent-role.entity';
import { ActionEnum } from '../../utilities/enums/actions.enum';
import { AgentService } from './agent.service';
import { Agent } from '../entities/agent.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly companyCategoryService: CompanyCategoryService,
    private readonly userService: UserService,
    private readonly agentRoleService: AgentRoleService,
    private readonly agentService: AgentService
  ) {}

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }


  async findAllByUser(phone: string): Promise<Company[]> {
    const user =  await this.userService.findOneByPhone(phone);
    return user.companies;
  }

  async findOneById(id: number): Promise<Company> {
    const company = await this.companyRepository
      .findOneOrFail({ where: { id: id } })
      .catch((error) => {
        throw new NotFoundException(`Company with id ${id} is not found`);
      });
    return company;
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.companyRepository.softDelete(id);
  }

  async create(createCompanyDto: CreateCompanyDto, user: User): Promise<Company> {
    const newCompany = new Company();
    const categoryType = await this.companyCategoryService.findOneById(
      createCompanyDto.companyCategoryId,
    );
    const agentRole: AgentRole = await this.agentRoleService.findOneByName("Créateur sur Nutito");
    Object.keys(createCompanyDto).forEach(
        (key) => {
            newCompany[key] = createCompanyDto[key];
        }
    );
    newCompany.category = categoryType;
    newCompany.owner = user;
    let savedCompany = await newCompany.save();
    let createAgentDto: CreateAgentDto = {
      user_id: user.id,
      company_id: savedCompany.id,
      agent_role_id: agentRole.id,
      abilities: Object.values(ActionEnum)
    }
    this.agentService.create(createAgentDto);
    return savedCompany;
  }

  myCompanies(id:number){
    const user:User = User.create({id:id});
   return this.companyRepository.find({where:{owner:user}}).catch((error)=>{
      console.log("Erreur ");
      throw new NotFoundException();
      
    });
  }

  async update(
    updateCompanyDto: UpdateCompanyDto,
    id: number,
  ): Promise<UpdateResult> {
    return await this.companyRepository.update(id, updateCompanyDto);
  }

  async getCompanyAgents(id: number): Promise<Agent[]> {
    return (await this.findOneById(id)).agents;
  }
}
