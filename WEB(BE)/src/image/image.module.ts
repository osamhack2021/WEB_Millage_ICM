import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ImageEntity} from './image.entity';
import {ImageService} from './image.service';
import {ImageController} from './image.controller';
import {MulterModule} from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageEntity]),
    MulterModule.register({dest: './upload'}),
  ],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImageModule {}
