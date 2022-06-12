import { Injectable } from "@nestjs/common/decorators";
import { UserService } from "src/user/services/user.service";
import { AgentRoleService } from "./agent-role.service";
import { CompanyCategoryService } from "./company-category.service";
import { OperationTypeService } from "./operation-type.service";
import { WorkfieldService } from "./workfield.service";
import { ConstantService } from './constant.service';


@Injectable()
export class SeederService{
    constructor(
        private readonly userService: UserService,
        private readonly workfieldService: WorkfieldService,
        private readonly companyCategoryService: CompanyCategoryService,
        private readonly agentRoleService: AgentRoleService,
        private readonly operationTypeService: OperationTypeService,
        private readonly constantService: ConstantService,

        
    ){}

    
  async init(): Promise<void> {
    await this.agentRoleService.init();
    await this.workfieldService.init();
    await this.companyCategoryService.init();
    await this.operationTypeService.init();
    await this.userService.init();
    await this.constantService.init!();
  }

}