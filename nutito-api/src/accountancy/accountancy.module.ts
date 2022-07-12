import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AgentRole } from './entities/agent-role.entity';
import { BaseEntity } from './entities/base.entity';
import { ClientOperationType } from './entities/client-operation-type.entity';
import { CompanyCategory } from './entities/company-category.entity';
import { Company } from './entities/company.entity';
import { Fichier } from './entities/fichier.entity';
import { Licence } from './entities/licence.entity';
import { OperationType } from './entities/operation-type.entity';
import { Operation } from './entities/operation.entity';
import { Workfield } from './entities/workfield.entity';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { AgentService } from './services/agent.service';
import { AgentController } from './controllers/agent.controller';
import { UserModule } from '../user/user.module';
import { Agent } from './entities/agent.entity';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { CompanyCategoryService } from './services/company-category.service';
import { CompanyCategoryController } from './controllers/company-category.controller';
import { WorkfieldController } from './controllers/workfield.controller';
import { WorkfieldService } from './services/workfield.service';
import { AgentRoleController } from './controllers/agent-role.controller';
import { AgentRoleService } from './services/agent-role.service';
import { LicenceController } from './controllers/licence.controller';
import { LicenceService } from './services/licence.service';
import { ConstantController } from './controllers/constant.controller';
import { ConstantService } from './services/constant.service';
import { Constant } from './entities/constant.entity';
import { SeederService } from './services/seeder.service';
import { SeederController } from './controllers/seeder.controller';
import { OperationTypeService } from './services/operation-type.service';
import { OperationTypeController } from './controllers/operation-type.controller';
import { OperationController } from './controllers/operation.controller';
import { OperationService } from './services/operation.service';
import { ClientOpationTypeService } from './services/client-operation-type.service';
import { ClientOperationController } from './controllers/client-operation.controller';
import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';
import { PDFModule } from '@t00nday/nestjs-pdf';

@Module({
    imports: [
   TypeOrmModule.forFeature([
           Account,
           AgentRole,
           Agent,
           ClientOperationType,
           CompanyCategory,
           Company,
           Fichier,
           Licence,
           OperationType,
           Operation,
           Workfield,
           Constant
       ]),
       UserModule,
       PDFModule.register({
        view: {
            root: '../views',
            engine: 'pug',
        },
    }),
    ],
    exports: [
        AccountService,
        AgentService,
        CompanyService,
        CompanyCategoryService,
        WorkfieldService,
        AgentRoleService,
        LicenceService,
        ConstantService,
        FileService
    ],
    controllers: [
        AccountController,
        AgentController,
        CompanyController,
        CompanyCategoryController,
        WorkfieldController,
        AgentRoleController,
        LicenceController,
        ConstantController,
        SeederController,
        OperationController,
        OperationTypeController,
        ClientOperationController,
        FileController
    ],
    providers: [
       AccountService,
       AgentService,
       CompanyService,
       CompanyCategoryService,
       WorkfieldService,
       AgentRoleService,
       LicenceService,
       ConstantService,
       SeederService,
       OperationTypeService,
       OperationService,
       ClientOpationTypeService,
       FileService
    ],
})
export class AccountancyModule {}
