/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateAgentDto{
    @IsNotEmpty()
    @IsPositive()
    user_id: number;

    
}