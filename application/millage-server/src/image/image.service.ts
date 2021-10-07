import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ImageEntity} from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  async uploadImages(postId: number, files: Array<Express.Multer.File>) {
    const filenames = [];
    files.forEach((file) => {
      const fileInfo = {
        url: file.filename,
        originalname: file.originalname,
        postId,
      };
      filenames.push(fileInfo);
    });
    const newImages: ImageEntity[] = this.imageRepository.create(filenames);
    try {
      return await this.imageRepository.save(newImages);
    } catch (err) {
      throw new Error(err);
    }
  }
}
