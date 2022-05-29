import { UpdateCompanyDto } from './../dtos/update-company.dto';
import { CreateCompanyDto } from './../dtos/create-company.dto';
import { CompanyService } from './../services/company.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { ApiTags } from '@nestjs/swagger';
import { ConstantService } from '../services/constant.service';
import { CreateConstantDto } from '../dtos/create-constant.dto';
import { Constant } from '../entities/constant.entity';

@Controller('constants')
@ApiTags('constants')
export class ConstantController {
  constructor(private readonly constantService: ConstantService) {}

  @Post('/create')
  async createConstant(
    @Body() createConstantDto: CreateConstantDto,
  ): Promise<Constant> {
    return await this.constantService.create(createConstantDto);
  }

  @Get('/:name')
  async getConstantByName(@Param('name') name: string): Promise<Constant> {
    return await this.constantService.findOneByName(name);
  }
  
}
