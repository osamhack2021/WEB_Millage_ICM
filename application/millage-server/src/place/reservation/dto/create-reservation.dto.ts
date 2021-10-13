import {IsNotEmpty} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  start: string;

  @IsNotEmpty()
  end: string;

  @IsNotEmpty()
  placeId: number;
}
