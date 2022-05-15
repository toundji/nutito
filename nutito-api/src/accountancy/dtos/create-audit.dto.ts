import { IsDate, IsNotEmpty, IsPositive } from "class-validator";

export class AuditDto{
    @IsNotEmpty()
    @IsDate()
    created_at: Date;

    updated_at: Date;

    @IsNotEmpty()
    @IsPositive()
    creator_id: number;

    @IsNotEmpty()
    @IsPositive()
    updater_id: number;

}