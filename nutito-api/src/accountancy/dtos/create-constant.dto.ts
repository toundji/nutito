import { IsNotEmpty, IsString } from "class-validator";

export class CreateConstantDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    value: string | number;

}