import { IsNotEmpty, IsString, IsPositive, IsNumber } from 'class-validator';

export class CreateFileDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    entity_id: string;

    @IsNumber()
    @IsPositive()
    operation_id: string;

    @IsNumber()
    @IsPositive()
    user_id: string;

}