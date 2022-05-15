import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateWorkfieldDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;


}