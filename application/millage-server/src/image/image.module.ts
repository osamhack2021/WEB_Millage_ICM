import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ImageEntity} from './image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImageModule {}
