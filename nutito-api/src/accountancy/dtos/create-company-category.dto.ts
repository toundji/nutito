import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyCategory {
    @IsNotEmpty()
    @IsString()
    short: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}