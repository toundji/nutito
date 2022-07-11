
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateAgentAbilityDto{
    @ApiProperty({required:true})
    @IsNumber()
    @IsPositive()
    manager_id:number;

    @ApiProperty({required:true})
    @IsNumber()
    @IsPositive()
    agent_id:number;

    @ApiProperty({required:true})
    @IsString({each:true})
    abilities:string[];
}