import {IsNumberString} from 'class-validator';

export class PostParams {
  @IsNumberString()
  id: number;
}

export class GetPostParams extends PostParams {
}
