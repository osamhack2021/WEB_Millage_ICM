import {IsNotEmpty} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  parentCommentId?: number;
}
