import {IsNotEmpty} from 'class-validator';
import {PostType} from '../post.interface';

export class CreatePostDto {
  @IsNotEmpty()
  boardId: number;

  @IsNotEmpty()
  postType: PostType;

  @IsNotEmpty()
  title: string;

  content: string;

  pollList: string[];

  rCount: number;
}
