import {IsNotEmpty} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  readonly email: string;

  readonly password: string;

  readonly phonenumber: string;

  readonly fullname: string;

  readonly nickname: string;

  unitId: number;

  readonly unitName: string;

  readonly roleId: number;
}
