import { IsPositive } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Agent } from '../entities/agent.entity';

export class CreateCareerDto {
    @IsNotEmpty()
    agent: Agent;

    @IsPositive()
    @IsNotEmpty()
    company_id: number;

    @IsNotEmpty()
    @IsPositive()
    agent_role_id: number;

}