import { IsArray, IsPositive } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateAgentDto {
    @IsNotEmpty()
    @IsPositive()
    user_id: number;

    @IsPositive()
    @IsNotEmpty()
    company_id: number;

    @IsNotEmpty()
    @IsPositive()
    role_id: number;

    @IsNotEmpty()
    @IsArray()
    abilities: string[];

}