import { IsNumber } from 'class-validator';
import { IsDate } from 'class-validator';
import { IsString } from 'class-validator';
import { CreateOperationDto } from './create-operation.dto';
import { PartialType } from '@nestjs/swagger';
export class UpdateOperationDto extends PartialType(CreateOperationDto){
}