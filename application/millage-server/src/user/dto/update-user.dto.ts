import {OmitType} from '@nestjs/swagger';
import {CreateUserDto} from '.';

export class UpdateUserDto extends OmitType(
    CreateUserDto,
    ['unitId', 'roleId'] as const,
) {
    isConfirmed: boolean;
    id: number;
}
