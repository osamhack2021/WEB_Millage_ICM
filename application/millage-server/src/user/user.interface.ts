import {UnitEntity} from 'src/unit/unit.entity';
import { UserRoleEntity } from 'src/user_role/user_role.entity';

export interface UserData {
  id: number;
  username: string;
  email: string;
  fullname: string;
  nickname: string;
  phonenumber: string;
  unit: UnitEntity;
  role: UserRoleEntity;
}

export interface UserRO {
  result: string;
  session?: UserData;
  message?: string;
}

export interface DefaultRO {
  result: string;
}
