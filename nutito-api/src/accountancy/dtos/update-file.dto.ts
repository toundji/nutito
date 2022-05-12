/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { IsPositive } from 'class-validator';

export class UpdateFileDto{
   
    @IsString()
    name ? : string;

   
    @IsString()
    location ? : string;

   
    @IsString()
    mimetype ? : string;

   
    @IsPositive()
    entity_id ? : number;
    
   
    @IsPositive()
    operation_id ? : number;

   
    @IsPositive()
    user_id ? : number;
}