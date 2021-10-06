import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EventsModule} from './events/events.module';
import {UserModule} from './user/user.module';
import {BoardModule} from './board/board.module';
import {UnitModule} from './unit/unit.module';
import {MessageModule} from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EventsModule,
    UserModule,
    BoardModule,
    UnitModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
