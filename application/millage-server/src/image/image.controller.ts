import {Body, Controller, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Result} from 'src/common/common.interface';

@ApiBearerAuth()
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('uploadMultipleImages')
  async uploadMultipleImages(@Body() dto: UploadMultipleImagesDto): Promise<UploadMultipleImagesRO> {
    try {
      const uploadMultipleImagesRO = await this.imageService.uploadMultipleImages(dto);
      return uploadMultipleImagesRO;
    } catch (err) {
      return {
        result: Result.FAIL,
        message: err,
      };
    }
  }
}
