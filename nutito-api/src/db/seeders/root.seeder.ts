import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Connection } from 'typeorm';
import { AccountSeeder } from './account.seeder';
import { AgentRoleSeeder } from './agent-role.seeder';
import { AgentSeeder } from './agent.seeder';
import { ClientOperationTypeSeeder } from './client-operation-type.seeder';
import { UserSeeder } from './user.seeder';
import { CompanyCategorySeeder } from './company-category.seeder';
import { CompanySeeder } from './company.seeder';
import { FileSeeder } from './file.seeder';
import { LicenceSeeder } from './licence.seeder';
import { OperationSeeder } from './operation.seeder';
import { OperationTypeSeeder } from './operation-type.factory';
import { WorkfieldSeeder } from './workfield.seeder';

export class RootSeeder extends Seeder {
  async run(connection: Connection) {
    await this.call(connection, [
      UserSeeder,
      AccountSeeder,
      AgentRoleSeeder,
      AgentSeeder,
      ClientOperationTypeSeeder,
      CompanyCategorySeeder,
      CompanySeeder,
      FileSeeder,
      LicenceSeeder,
      OperationTypeSeeder,
      OperationSeeder,
      WorkfieldSeeder,
    ]);
  }
}
