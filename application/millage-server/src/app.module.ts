import {join} from 'path';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {MailerModule} from '@nestjs-modules/mailer';
import {ServeStaticModule} from '@nestjs/serve-static';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EventsModule} from './events/events.module';
import {UserModule} from './user/user.module';
import {BoardModule} from './board/board.module';
import {UnitModule} from './unit/unit.module';
import {MessageModule} from './message/message.module';
import {PostModule} from './post/post.module';
import {ScheduleModule} from './schedule/schedule.module';
import {PlaceModule} from './place/place.module';
import {ImageModule} from './image/image.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EventsModule,
    UserModule,
    BoardModule,
    UnitModule,
    MessageModule,
    PostModule,
    ScheduleModule,
    PlaceModule,
    ImageModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PWD,
        },
      },
      defaults: {
        from: '"Millage" <military_village@naver.com>',
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
