import {IsNumberString} from 'class-validator';

export class UserParams {
  @IsNumberString()
  id: number;
}
