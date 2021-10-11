import {Module} from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';
import {PugAdapter} from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import path from 'path';

import {MailService} from './mail.service';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'Naver',
        host: 'smtp.naver.com',
        posrt: 587,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PWD,
        },
      },
      defaults: {
        from: '"Millage" <military_village@naver.com>',
      },
      template: {
        dir: path.join(__dirname, '/templates'),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
})
export class MailModule {}

