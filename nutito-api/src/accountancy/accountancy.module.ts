import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AgentRole } from './entities/agent-role.entity';
import { Agent } from './entities/agent.entity';
import { Audit } from './entities/audit.entity';
import { Career } from './entities/career.entity';
import { ClientOperationType } from './entities/client-operation-type.entity';
import { CompanyCategory } from './entities/company-category.entity';
import { Company } from './entities/company.entity';
import { File } from './entities/file.entity';
import { Licence } from './entities/licence.entity';
import { OperationType } from './entities/operation-type.entity';
import { Operation } from './entities/operation.entity';
import { WorkField } from './entities/work-field.entity';
@Module({
    imports: [
    //    TypeOrmModule.forFeature([
    //        Account,
    //        AgentRole,
    //        Agent,
    //        Audit,
    //        Career,
    //        ClientOperationType,
    //        CompanyCategory,
    //        Company,
    //        File,
    //        Licence,
    //        OperationType,
    //        Operation,
    //        WorkField
    //    ])
    ],
    exports: [
        
    ],
    controllers: [
        
    ],
    providers: [
       
    ],
})
export class AccountancyModule {}
