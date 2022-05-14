<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { IsPositive, IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Agent } from '../entities/agent.entity';

export class CreateCareerDto{
    @IsNotEmpty()
    agent: Agent;

    @IsPositive()
    @IsNotEmpty()
    company_id: number;

    @IsNotEmpty()
    @IsPositive()
    agent_role_id: number;

   

=======
import { IsPositive } from "class-validator";

export class CreateCareerDto {
    @IsPositive()
    agent_id: number;

    @IsPositive()
    company_id: number;

    @IsPositive()
    agent_role_id: number;
>>>>>>> dev
}