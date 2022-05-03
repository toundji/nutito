/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsPositive } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateAgentDto{
    @IsNotEmpty()
    @IsPositive()
    user_id: number;
    
}