import { Controller, Get, Render } from '@nestjs/common';
import { DoesNotRequireAuthentication } from './utilities/decorators/does-not-require-authentication.decorator';
import { DoesNotRequireAuthorisations } from './utilities/decorators/does-not-require-authorisations.decorator';


@Controller()
export class AppController {
  constructor() {}

  @Get('/')
  @DoesNotRequireAuthentication()
  @DoesNotRequireAuthorisations()
  @Render('note')
  async home() {
    return { data: "" }
  }
}
