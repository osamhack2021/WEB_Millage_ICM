import {IsNumberString} from 'class-validator';

export class PostParams {
  @IsNumberString()
  id: number;
}

export class GetPostParams extends PostParams {
}

export class VoteParams {
  @IsNumberString()
  postId: number;

  @IsNumberString()
  pollId: number;
}
