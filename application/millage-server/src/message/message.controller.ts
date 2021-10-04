import {Get, Req, Controller} from '@nestjs/common';
import {Request} from 'express';
import {MessageService} from './message.service';
import {MessageRO} from './message.interface';
import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';
import {Result} from '../common/common.interface';

@ApiBearerAuth()
@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('messagebox/list')
  async getMessageBoxList(@Req() request : Request) : Promise<MessageRO> {
    if (!request.session || !request.session.user || !request.session.user.id) {
      return {
        result: Result.FAIL,
        message: '로그인이 필요합니다.',
      };
    } else {
      const messageboxes = await this.messageService.getMessageBoxes(+request.session.user.id);
      return {
        result: Result.SUCCESS,
        messageboxes: messageboxes,
      };
    }
  }

  @Get('detail/:id')
  async getMessages(@Req() request : Request) : Promise<MessageRO> {
    if (!request.session || !request.session.user || !request.session.user.id) {
      return {
        result: Result.FAIL,
        message: '로그인이 필요합니다.',
      };
    } else {
      const messages = await this.messageService.getMessages(+request.session.user.id, +request.params.id);
      return {
        result: Result.SUCCESS,
        messages: messages,
      };
    }
  }
}
