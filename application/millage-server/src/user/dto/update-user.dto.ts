import {Role} from '../../user_role/user_role.interface';

export class UpdateUserDto {
    username?: string;
    email?: string;
    fullname?: string;
    nickname?: string;
    isConfirmed?: boolean;
    role?: Role;
}
