<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCompanyCategoryDto{
=======
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyCategory {
>>>>>>> dev
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
<<<<<<< HEAD
   
=======

>>>>>>> dev
}