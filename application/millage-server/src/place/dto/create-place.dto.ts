import {IsNotEmpty, IsNumber} from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  seats: number;
}
