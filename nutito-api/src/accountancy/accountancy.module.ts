/* eslint-disable prettier/prettier */
import { UserService } from './../user/services/user.service';
import { WorkfieldService } from './services/workfield.service';
import { OperationTypeService } from './services/operation-type.service';
import { OperationService } from './services/operation.service';
import { LicenceService } from './services/licence.service';
import { FileService } from './services/file.service';
import { CompanyCategoryService } from './services/company-category.service';
import { CompanySerice } from './services/company.service';
import { careerService } from './services/career.service';
import { AgentRoleService } from './services/agent-role.service';
import { WorkfieldController } from './controllers/workfield.controller';
import { OperationController } from './controllers/operation.controller';
import { OperationTypeController } from './controllers/operation-type.controller';
import { FileController } from './controllers/file.controller';
import { CompanyController } from './controllers/company.controller';
import { CompanyCategoryController } from './controllers/company-category.controller';
import { ClientOpationTypeController } from './controllers/client-operation-type.controller';
import { CareerController } from './controllers/career.controller';
import { AgentRoleController } from './controllers/agent-role.controller';
import { AgentService } from './services/agent.service';
import { AgentController } from './controllers/agent.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccoutController } from './controllers/account.controller';
import { Account } from './entities/account.entity';
import { AgentRole } from './entities/agent-role.entity';
import { Agent } from './entities/agent.entity';
import { BaseEntity } from './entities/base.entity';
import { Career } from './entities/career.entity';
import { ClientOperationType } from './entities/client-operation-type.entity';
import { CompanyCategory } from './entities/company-category.entity';
import { Company } from './entities/company.entity';
import { File } from './entities/file.entity';
import { Licence } from './entities/licence.entity';
import { OperationType } from './entities/operation-type.entity';
import { Operation } from './entities/operation.entity';
import { Workfield } from './entities/workfield.entity';
import { AccountService } from './services/account.service';
import { LicenceController } from './controllers/licence.controller';
import { ClientOpationTypeService } from './services/client-operation-type.service';
import { User } from 'src/user/entities/user.entity';
@Module({
    imports: [
       TypeOrmModule.forFeature([
           Account,
           AgentRole,
           Agent,
           Career,
           ClientOperationType,
           CompanyCategory,
           Company,
           File,
           Licence,
           OperationType,
           Operation,
           Workfield,
           User //userrepo 
           
       ])
    ],
    exports: [
        AccountService,
        AgentService,
        AgentRoleService,
        careerService,
        ClientOpationTypeService,
        CompanySerice,
        CompanyCategoryService,
        FileService,
        LicenceService,
        OperationService,
        OperationTypeService,
        WorkfieldService    
    ],
    controllers: [
        AccoutController, 
        AgentController,
        AgentRoleController, 
        CareerController,
         ClientOpationTypeController,
         CompanyCategoryController,
         CompanyController,
         FileController,
         LicenceController,
         OperationTypeController,
         OperationController,
         WorkfieldController
    ],
    providers: [
        UserService, //userservice va maintenant etre importer ici
       AccountService,
        AgentService,
        AgentRoleService,
        careerService,
        ClientOpationTypeService,
        CompanySerice,
        CompanyCategoryService,
        FileService,
        LicenceService,
        OperationService,
        OperationTypeService,
        WorkfieldService
    ],
})
export class AccountancyModule {}
