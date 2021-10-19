import {IsNotEmpty} from 'class-validator';
import {AuthType} from '../board.interface';

export class CreateBoardDto {
  @IsNotEmpty()
  readonly title: string;

  readonly description: string;

  @IsNotEmpty()
  readonly auth: AuthType;

  readonly anonymous: boolean;

  readonly pollAllowed: boolean;

  readonly recruitAllowed: boolean;

  readonly imageAllowed: boolean;

  @IsNotEmpty()
  readonly unitId: number;
}
