import {IsNotEmpty} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  postId: number;

  parentCommentId?: number;
}
