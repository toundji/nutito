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
           Workfield
       ]),
       UserModule
    ],
    exports: [
        AccountService,
        AgentService,
        CompanyService,
        CompanyCategoryService,
        WorkfieldService
    ],
    controllers: [
        AccountController,
        AgentController,
        CompanyController,
        CompanyCategoryController,
        WorkfieldController
    ],
    providers: [
       AccountService,
       AgentService,
       CompanyService,
       CompanyCategoryService,
       WorkfieldService
    ],
})
export class AccountancyModule {}
