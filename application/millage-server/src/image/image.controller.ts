import {Controller, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {FilesInterceptor} from '@nestjs/platform-express';
import {ImageService} from './image.service';
import {UploadMultipleImagesRO} from './image.interface';
import {extname} from 'path';
import {Result} from '../common/common.interface';
import {ImageEntity} from './image.entity';

const imageFileFilter = (
    req: any,
    file: Express.Multer.File,
    callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('파일 확장자가 올바르지 않습니다.'), false);
  }
  return callback(null, true);
};

const editFileName = (
    req: any,
    file: Express.Multer.File,
    callback: (error: Error, editedFileName: string) => void,
) => {
  const name = file.originalname.split('.').shift();
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

  callback(null, `${name}-${randomName}${fileExtName}`);
};

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
    let images = null;
    try {
      images = await this.imageService.uploadMultipleImages(files);
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err,
      };
    }
    return {
      result: Result.SUCCESS,
      imageURLs: images.map((image: ImageEntity) => image.url),
    };
  }
}
