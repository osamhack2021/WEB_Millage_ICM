import {IsNotEmpty} from 'class-validator';

export class UploadImagesDto {
  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  files: File[];
}
