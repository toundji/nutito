/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import {  IsNotEmpty } from "class-validator";

export class CreateAgentRoleDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    
    
}