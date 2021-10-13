import {IsNumber} from 'class-validator';
export class UpdatePlaceDto {
  name?: string;

  @IsNumber()
  seats?: number;
}
