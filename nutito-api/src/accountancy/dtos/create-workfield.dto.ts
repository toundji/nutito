import { IsNotEmpty, IsString } from 'class-validator';
export class CreateWorkfieldDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;


}