import { IsPositive } from 'class-validator';
export class updateAgentDto {
    @IsPositive()
    user_id?: number;
}