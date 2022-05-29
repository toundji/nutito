import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AgentRole } from './entities/agent-role.entity';
import { BaseEntity } from './entities/base.entity';
import { ClientOperationType } from './entities/client-operation-type.entity';
import { CompanyCategory } from './entities/company-category.entity';
import { Company } from './entities/company.entity';
import { File } from './entities/file.entity';
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
@Module({
    imports: [
       TypeOrmModule.forFeature([
           Account,
           AgentRole,
           Agent,
           ClientOperationType,
           CompanyCategory,
           Company,
           File,
           Licence,
           OperationType,
           Operation,
           Workfield,
           Constant
       ]),
       UserModule
    ],
    exports: [
        AccountService,
        AgentService,
        CompanyService,
        CompanyCategoryService,
        WorkfieldService,
        AgentRoleService,
        LicenceService,
        ConstantService
    ],
    controllers: [
        AccountController,
        AgentController,
        CompanyController,
        CompanyCategoryController,
        WorkfieldController,
        AgentRoleController,
        LicenceController,
        ConstantController
    ],
    providers: [
       AccountService,
       AgentService,
       CompanyService,
       CompanyCategoryService,
       WorkfieldService,
       AgentRoleService,
       LicenceService,
       ConstantService
    ],
})
export class AccountancyModule {}
