import { Controller, Get, Render } from '@nestjs/common';
import { SeederService } from './../services/seeder.service';
import { ApiTags } from '@nestjs/swagger';
import { DoesNotRequireAuthentication } from 'src/utilities/decorators/does-not-require-authentication.decorator';
import { DoesNotRequireAuthorisations } from 'src/utilities/decorators/does-not-require-authorisations.decorator';


@ApiTags("Seeder")
@Controller("seeder")
export class SeederController {
  constructor(
    private readonly seederService: SeederService
  ) {}


  
  @DoesNotRequireAuthentication()
  @DoesNotRequireAuthorisations()
  @Get("seed")
  init(){
    return this.seederService.init();
  }
}
