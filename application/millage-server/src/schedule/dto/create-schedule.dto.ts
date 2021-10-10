import {IsNotEmpty} from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  start: Date;

  end?: Date;
}
