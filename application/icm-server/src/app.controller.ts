import { Controller, Get, Render} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Root Api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('login')
  root(){}
}
