import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateUserDto  {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    ifu: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    birth_date: Date;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    birth_place: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    country: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    city: string;
}