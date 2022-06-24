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
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Agent } from '../entities/agent.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utilities/utils';
import { Fichier } from './../entities/fichier.entity';
import { ClientChoiceOperationTypeDto } from '../dtos/client-choice-operation.dto';
import { OperationType } from '../entities/operation-type.entity';
import { ClientOperationType } from '../entities/client-operation-type.entity';

@Controller('companies')
@ApiTags('companies')
export class CompanyController {
  constructor(private readonly companySerice: CompanyService) {}

  @Post('/create')
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() req,
  ): Promise<Company> {
    const user = req['user'];
    return await this.companySerice.create(createCompanyDto, user);
  }

  @Get()
  async getAllCompanies(): Promise<Company[]> {
    return await this.companySerice.findAll();
  }

  @Get("for-phone/:phone")
  async getAllCompaniesByUser(
    @Param('phone') phone: string,
  ): Promise<Company[]> {
    return await this.companySerice.findAllByUser(phone);
  }


  @Get("create/by/me")
  async getCreateByUser(
    @Req() req,
  ): Promise<Company[]> {
    const user = req['user'];
    return await this.companySerice.myCompanies(user.id);
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

  @Post("create/operation-type")
    async choice(@Body() choices: ClientChoiceOperationTypeDto): Promise<Company>{
        return await this.companySerice.choiceOperation(choices);
    }


  @Get(':id/agents')
  async getCompanyAgents(@Param('id') id: number): Promise<Agent[]> {
    return await this.companySerice.getCompanyAgents(id);
  }

  @Get(':id/operation-types')
  async getCompanyOperationType(@Param('id') id: number): Promise< Promise<OperationType[] | ClientOperationType[] > > {
    return await this.companySerice.getCompanyOperations(id);
  }


  @Get(':id/operation-types/personal')
  async getCompanyOperationTypePersonal(@Param('id') id: number): Promise< Promise< ClientOperationType[] > > {
    return await this.companySerice.getCompanyOperartionPersonal(id);
  }

  @Get(':id/operation-types/common')
  async getCompanyOperationTypeCommon(@Param('id') id: number): Promise< Promise< OperationType[] > > {
    return await this.companySerice.getCompanyOperationCommon(id);
  }

  @Post(":id/logo")
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './files/logos',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
 
  @ApiBody({
    schema:{
      type: 'object',
      properties: {
        logo:{
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  updateProfile(@Param('id') id: number, @UploadedFile() logo, @Req() req): Promise<Company>{
    const user = req['user'];
    return this.companySerice.updateLogo(id, logo, user);
  }

  @ApiOkResponse({ schema:{
        type: 'string',
        format: 'binary'
      }
  })
  @Get(":id/logo")
  async getLogo(@Param('id')id:number, @Res() res){
    const logo:Fichier = await this.companySerice.getLogo(id);
    return res.sendFile(logo.location, { root: './' });
  }

}
