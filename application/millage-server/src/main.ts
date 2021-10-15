import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {join} from 'path';
import * as session from 'express-session';
import * as MySQLStore  from 'express-mysql-session';
import {SECRET} from './config';
import {UserData} from './user/user.interface';
import * as ormconfig from '../../ormconfig.json';

/* eslint-disable */
declare module 'express-session' {
  interface SessionData {
    user: UserData;
  }
}

async function bootstrap() {
  const appOptions = {
    cors: {
      origin : true,
      credentials: true
    }
  };
    
  const mySqlStore = MySQLStore(session);

  const sessionHandler = new mySqlStore({
    host: ormconfig.host,
    port: ormconfig.port,
    user: ormconfig.username,
    password: ormconfig.password,
    database: ormconfig.database,
  });

  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      appOptions);
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.useStaticAssets(join(__dirname, '..', 'dist'));
    app.setGlobalPrefix('api');
    app.set('trust proxy', true);
    app.use(session( {
      proxy: true,
      secret: SECRET,
      store: process.env.NODE_ENV == 'production' ? sessionHandler : undefined,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: 'none'
      },
    }));

  // Swagger Options
  const options = new DocumentBuilder()
      .setTitle('Millage-Server')
      .setDescription('Web Server for OSAM Millage Project')
      .setVersion('1.0')
      .setBasePath('api')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  const errorHandler = (err, req, res, next) => {
    res.status(500).send(err);
  };

  app.use(errorHandler);
  // await app.listen(3000, async () => {
    // console.log('Server running on http://localhost:3000');
  await app.listen(4000, async () => {
    console.log('Server running on http://localhost:4000');
  });
}
bootstrap();
