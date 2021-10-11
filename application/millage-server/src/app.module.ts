import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EventsModule} from './events/events.module';
import {UserModule} from './user/user.module';
import {BoardModule} from './board/board.module';
import {UnitModule} from './unit/unit.module';
import {MessageModule} from './message/message.module';
import {PostModule} from './post/post.module';
import {ScheduleModule} from './schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EventsModule,
    UserModule,
    BoardModule,
    UnitModule,
    MessageModule,
    PostModule,
    ScheduleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
