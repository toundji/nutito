import { IsPositive } from 'class-validator';
export class UpdateCareerDto{
    @IsPositive()
    agent_id?: number;

    @IsPositive()
    company_id?: number;

    @IsPositive()
    agent_role_id?: number;

}