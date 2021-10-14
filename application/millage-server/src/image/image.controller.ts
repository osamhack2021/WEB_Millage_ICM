import {Body, Controller, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {FilesInterceptor} from '@nestjs/platform-express';
import {ImageService} from './image.service';
import {UploadImagesRO} from './image.interface';
import {extname} from 'path';
import {Result} from '../common/common.interface';
import {ImageEntity} from './image.entity';
import {UploadImagesDto} from './dto';
import { diskStorage } from 'multer';

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
        storage: diskStorage({destination: './upload', filename: editFileName}),
        fileFilter: imageFileFilter,
      }))
  @Post('uploadImages')
  async uploadImages(
      @Body() dto: UploadImagesDto,
      @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<UploadImagesRO> {
    let images = null;
    const {postId} = dto;
    try {
      images = await this.imageService.uploadImages(postId, files);
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
    return {
      result: Result.SUCCESS,
      imageURLs: images.map((image: ImageEntity) => image.url),
    };
  }
}
