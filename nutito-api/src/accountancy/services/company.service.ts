/* eslint-disable prettier/prettier */
import { CompanyCategoryService } from './company-category.service';
import { UpdateCompanyDto } from './../dtos/update-company.dto';
import { CreateCompanyDto } from './../dtos/create-company.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Company } from './../entities/company.entity';
import { BadRequestException, Injectable, Logger, NotFoundException, UploadedFile } from '@nestjs/common';
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
import { CompanyCategory } from '../entities/company-category.entity';
import { Workfield } from './../entities/workfield.entity';
import { Fichier } from '../entities/fichier.entity';
import { OperationType } from '../entities/operation-type.entity';
import { ClientChoiceOperationTypeDto } from '../dtos/client-choice-operation.dto';
import { ClientOperationType } from './../entities/client-operation-type.entity';
import { Account } from '../entities/account.entity';


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
      .findOneOrFail(id)
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
    const agentRole: AgentRole = await this.agentRoleService.findOneByName("CREATEUR SUR NUTITO");
    Object.keys(createCompanyDto).forEach(
        (key) => {
            newCompany[key] = createCompanyDto[key];
        }
    );
    newCompany.workfields = await Workfield.findByIds(createCompanyDto.workfields);

    newCompany.category = categoryType;
    newCompany.owner = user;

    const account:Account = Account.create({});
    const accounSaved :Account = await Account.save(account);
    newCompany.account = account;

    let savedCompany = await newCompany.save();


    const agent:Agent = Agent.create({
      user: user,
      role:agentRole,
      company:savedCompany,
      abilities: Object.values(ActionEnum),
    });
   const agentCreated :Agent = await Agent.save(agent);

   savedCompany.agents = [agentCreated];
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
  ): Promise<Company> {
    const company: Company = await this.companyRepository.findOne(id);
    Object.keys(updateCompanyDto).forEach((key:string)=>{
      company[key]=updateCompanyDto[key];
    });
    if(updateCompanyDto.company_category_id){
      company.category = await CompanyCategory.findOne(updateCompanyDto.company_category_id)
    }
    if(updateCompanyDto.companies_workfields && updateCompanyDto.companies_workfields.length > 0 ){

      company.workfields = await Workfield.findByIds(updateCompanyDto.companies_workfields);

    }
    
    return await this.companyRepository.save(company);
  }

  async getCompanyAgents(id: number): Promise<Agent[]> {
   const company:Company =  await Company.findOne(id).catch((error)=>{
      console.log(error);
      throw new BadRequestException("Erreur lors de la récuperation de l'entreprise. Données invalides");
    });
    return company.agents;
  }


  async getCompanyOperations(id: number): Promise<OperationType[] | ClientOperationType[] > {
    return Company.findOne(id, {relations:["operationTypes", "clientOperationTypes"]}).then((company)=>{
      return [...company.operationTypes, ...company.clientOperationTypes];
    }).catch((error)=>{

      console.log(error);
      throw new BadRequestException("Erreur lors de la récuperation de l'entreprise. Données invalides");
    })
  }

  async getCompanyOperartionPersonal(id: number): Promise< ClientOperationType[] > {
    return Company.findOne(id, {relations:["clientOperationTypes"]}).then((company)=>{
      return company.clientOperationTypes;
    }).catch((error)=>{

      console.log(error);
      throw new BadRequestException("Erreur lors de la récuperation de l'entreprise. Données invalides");
    })
  }

  async getCompanyOperationCommon(id: number): Promise<OperationType[] > {
    return Company.findOne(id, {relations:["operationTypes"]}).then((company)=>{
      return company.operationTypes;
    }).catch((error)=>{

      console.log(error);
      throw new BadRequestException("Erreur lors de la récuperation de l'entreprise. Données invalides");
    })
  }


  
  async updateLogo(id: number ,@UploadedFile() logo, createur: User) {
    const company: Company =await Company.findOne(id);
    const file: Fichier = new Fichier();
    const name = logo.originalname.split(".")[0];

    file.creator_id = createur?.id;
    file.name = name,
    file.location= logo.path,
    file.mimetype= logo.mimetype,
    file.entity_name = "companies";
    file.entity_id= id;
    const savedFile: Fichier= await file.save().catch((e)=>{
      Logger.error(e);
      throw new BadRequestException(
        "Les données que nous avons réçues ne sont pas celle que nous espérons",
      );
    });
    company.logo = savedFile;
    return Company.save(company).catch((e)=>{
      Logger.error(e);
      throw new BadRequestException(
        "Les données que nous avons réçues ne sont pas celle que nous espérons",
      );
    });

  }

 async getLogo(id:number):Promise<Fichier>{
    const company:Company = await Company.findOne(id, {relations: ["logo"]});
    return company.logo;
  }

  async choiceOperation(createClientOperationTypeDto  : ClientChoiceOperationTypeDto): Promise<Company>{
    const company: Company = await Company.findOne(createClientOperationTypeDto.company_id, {relations: ["operationTypes"]});
    if(company == null){
      throw new BadRequestException("L'entreprise indiquée n'existe pas");
    }
    const typesList: OperationType[] = await OperationType.findByIds(createClientOperationTypeDto.operationType_ids);
    if(typesList.length ==0){
        throw new BadRequestException("Les opération indiquer n'existent pas");
    }
  
   company.operationTypes ??= [];
   company.operationTypes.push(...typesList);
   return await Company.save(company);
}

}
