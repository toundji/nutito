import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { DoesNotRequireAuthentication } from '../../utilities/decorators/does-not-require-authentication.decorator';
import { DoesNotRequireAuthorisations } from '../../utilities/decorators/does-not-require-authorisations.decorator';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { Company } from '../entities/company.entity';



@Controller('companies')
export class CompanyController {

  constructor(
    private mailservice: MailService
  ) { }


//   @Post('create')
//   async signup(@Body() body: CreateCompanyDto): Promise<Company> {
    
//   }

}
