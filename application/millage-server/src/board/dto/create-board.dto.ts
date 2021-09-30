import {IsNotEmpty} from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  readonly title: string;

  readonly description: string;

  @IsNotEmpty()
  readonly auth: number;

  readonly anonymous: boolean;

  readonly pollAllowed: boolean;

  readonly recruitAllowed: boolean;

  readonly imageAllowed: boolean;

  @IsNotEmpty()
  readonly unitId: number;
}
