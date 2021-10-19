import {IsNotEmpty} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  start: Date;

  @IsNotEmpty()
  end: Date;

  @IsNotEmpty()
  placeId: number;
}
