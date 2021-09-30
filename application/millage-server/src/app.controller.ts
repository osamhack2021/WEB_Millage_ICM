import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AppService} from './app.service';

@Controller()
@ApiTags('Root Api')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
