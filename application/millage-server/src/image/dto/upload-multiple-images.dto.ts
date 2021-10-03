import {IsNotEmpty} from 'class-validator';

export class UploadMultipleImagesDto {
  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  files: File[];
}
