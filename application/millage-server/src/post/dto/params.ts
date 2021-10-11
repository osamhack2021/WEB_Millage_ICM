import {IsInt, IsNumberString} from 'class-validator';

export class PostParams {
  @IsNumberString()
  id: number;
}

export class GetPostParams extends PostParams {
}

export class VoteParams {
  @IsInt()
  postId: string;

  @IsInt()
  pollId: string;
}
