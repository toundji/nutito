import { IsNotEmpty, IsString } from 'class-validator';
export class CreateWorkFieldDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;


}