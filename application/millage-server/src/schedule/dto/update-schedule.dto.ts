import {IsNotEmpty} from 'class-validator';
import {CreateScheduleDto} from '.';

export class UpdateScheduleDto extends CreateScheduleDto {
  @IsNotEmpty()
  id: number;
}
