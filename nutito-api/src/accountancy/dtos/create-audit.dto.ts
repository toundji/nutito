/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsString,IsPositive } from "class-validator";

export class AuditDto{
    @IsNotEmpty()
    @IsDate()
    created_at: Date;

    updated_at: Date;

    @IsNotEmpty()
    @IsPositive()
    creator_id: number;

    updater_id: number;

    @IsNotEmpty()
    @IsString()
    slug: string;
}