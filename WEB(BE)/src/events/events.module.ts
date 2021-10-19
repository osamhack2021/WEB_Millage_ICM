import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MessageService} from '../message/message.service';
import {MessageEntity} from '../message/message.entity';
import {EventsGateway} from './events.gateway';


@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [EventsGateway, MessageService],
})
export class EventsModule {}
