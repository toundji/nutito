import { IsString } from 'class-validator';

export class UpdateAgentRoleDto{
    @IsString()
    name? : string;

    @IsString()
    description? : string;
    
}