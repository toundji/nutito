import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateAgentDto {
    @IsNotEmpty()
    @IsPositive()
    user_id: number;
}