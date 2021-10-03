import {Controller, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Result} from '../common/common.interface';
import {ImageService} from './image.service';
import {UploadMultipleImagesDto} from './dto';
import {UploadMultipleImagesRO} from './image.interface';
import {FilesInterceptor} from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('uploadMultipleImages')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleImages(@UploadedFiles() files: Array<Express.Multer.File>): Promise<UploadMultipleImagesRO> {
    try {
      const imageURLs = await this.imageService.uploadMultipleImages(dto);
      return {
        result: Result.SUCCESS,
        urls: imageURLs,
      };
    } catch (err) {
      return {
        result: Result.FAIL,
        message: err,
      };
    }
  }
}
