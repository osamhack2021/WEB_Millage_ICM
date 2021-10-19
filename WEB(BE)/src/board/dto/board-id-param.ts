import {IsNumberString} from 'class-validator';

export class BoardIdParam {
  @IsNumberString()
  id: number;
}
