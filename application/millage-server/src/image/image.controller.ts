import {Body, Controller, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {FilesInterceptor} from '@nestjs/platform-express';

import {Result} from '../common/common.interface';
import {ImageService} from './image.service';
import {UploadMultipleImagesRO} from './image.interface';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

@ApiBearerAuth()
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseInterceptors(FilesInterceptor(
      'files',
      10,
      {
        storage: ({
          destination: './upload',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }))
  @Post('uploadMultipleImages')
  async uploadMultipleImages(
      @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<UploadMultipleImagesRO> {
    try {
      await this.imageService.uploadMultipleImages(files);
    } catch (err) {
      
    }
  }
}
