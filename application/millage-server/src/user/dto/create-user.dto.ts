import {IsNotEmpty} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  readonly phonenumber: string;

  readonly fullname: string;

  readonly nickname: string;

  readonly unitId: number;

  readonly roleId: number;
}
