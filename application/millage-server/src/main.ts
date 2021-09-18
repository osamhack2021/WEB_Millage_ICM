import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const appOptions = {cors: true};
  const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  //Swagger Options
  const options = new DocumentBuilder()
    .setTitle('Millage-Server')
    .setDescription('Web Server for OSAM Millage Project')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);



  await app.listen(3000, async () => {
    console.log('Server running on http://localhost:3000');
  });

}
bootstrap();
