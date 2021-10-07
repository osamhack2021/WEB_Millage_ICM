import {IsNumberString} from 'class-validator';

export class GetPostParams {
  @IsNumberString()
  id: number;
}
