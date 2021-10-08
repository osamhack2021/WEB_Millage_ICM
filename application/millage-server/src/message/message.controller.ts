import {Get, Post, Req, Controller} from '@nestjs/common';
import {Request} from 'express';
import {MessageService} from './message.service';
import {MessageRO} from './message.interface';
import {ResultObject, Result} from '../common/common.interface';
import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  private checkAuth(@Req() request : Request) : boolean {
    if (!request.session || !request.session.user || !request.session.user.id) {
      return false;
    }

    return true;
  }

  @Get('unread')
  async getUnreadMessageCount(@Req() request: Request) : Promise<number> {
    if (!this.checkAuth(request)) {
      return 0;
    } else {
      return await this.messageService.getUnreadMessageCount(+request.session.user.id);
    }
  }

  @Get('messagebox/list')
  async getMessageBoxList(@Req() request : Request) : Promise<MessageRO> {
    if (!this.checkAuth(request)) {
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
    if (!this.checkAuth(request)) {
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

  @Post('read/:id')
  async readMessages(@Req() request : Request) : Promise<ResultObject> {
    if (!this.checkAuth(request)) {
      return {
        result: Result.FAIL,
        message: '로그인이 필요합니다.',
      };
    } else {
      const messages = await this.messageService.setMessagesAsRead(+request.session.user.id, +request.params.id);
      return messages;
    }
  }
  @Post(':id')
  async postMessage(@Req() request : Request) : Promise<ResultObject> {
    if (!this.checkAuth(request)) {
      return {
        result: Result.FAIL,
        message: '로그인이 필요합니다.',
      };
    } else {
      const messages = await this.messageService.sendMessage(
          +request.session.user.id,
          +request.params.id,
          request.body.message,
          request.body.anonymous
      );

      // add socket cocde
      return messages;
    }
  }
}
