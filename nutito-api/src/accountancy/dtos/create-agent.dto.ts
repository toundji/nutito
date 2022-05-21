import { IsPositive } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateAgentDto {
    @IsNotEmpty()
    @IsPositive()
    agent_id: number;

    @IsPositive()
    @IsNotEmpty()
    company_id: number;

    @IsNotEmpty()
    @IsPositive()
    agent_role_id: number;

}