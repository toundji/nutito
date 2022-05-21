import { IsPositive } from 'class-validator';
export class UpdateAgentDto {
    @IsPositive()
    user_id?: number;
}