import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MessageService} from '../message/message.service';
import {MessageEntity} from '../message/message.entity';


@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessageService],
})
export class EventsModule {}
