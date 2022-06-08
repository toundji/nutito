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
import { Agent } from '../entities/agent.entity';

@Controller('companies')
@ApiTags('companies')
export class CompanyController {
  constructor(private readonly companySerice: CompanyService) {}

  @Post('/create')
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return await this.companySerice.create(createCompanyDto);
  }

  @Get()
  async getAllCompanies(): Promise<Company[]> {
    return await this.companySerice.findAll();
  }

  @Get()
  async getAllCompaniesByUser(
    @Param('phone') phone: string,
  ): Promise<Company[]> {
    return await this.companySerice.findAllByUser(phone);
  }

  @Get('/:id')
  async getCompanyById(@Param('id') id: number): Promise<Company> {
    return await this.companySerice.findOneById(id);
  }

  @Put('update/:id')
  async updateCompany(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companySerice.update(updateCompanyDto, id);
  }

  @Delete('delete/:id')
  async deleteCompany(@Param('id') id: number) {
    return await this.companySerice.delete(id);
  }


  @Get(':id/agents')
  async getCompanyAgents(@Param('id') id: number): Promise<Agent[]> {
    return await this.companySerice.getCompanyAgents(id);
  }

}
