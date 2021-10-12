import {OmitType} from '@nestjs/swagger';
import {CreateUserDto} from '.';

export class UpdateUserDto extends OmitType(
    CreateUserDto,
    ['unitId', 'roleId'] as const,
) {
    isConfirmed: boolean;
    username: string;
    email: string;
    password: string;
    phonenumber: string;
}
