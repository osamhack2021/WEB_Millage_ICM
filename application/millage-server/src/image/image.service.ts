import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ImageEntity} from './image.entity';
import {UploadMultipleImagesDto} from './dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  async uploadMultipleImages(dto: UploadMultipleImagesDto): Promise<string[]> {
    const files: File[] = [];
    dto.files.forEach((file) => {
      
    });
  }
}
