import {ResultObject} from 'src/common/common.interface';
import {UnitEntity} from 'src/unit/unit.entity';
import {UserRoleEntity} from '../user_role/user_role.entity';

export interface UserData {
  id: number;
  username: string;
  email: string;
  fullname: string;
  nickname: string;
  phonenumber: string;
  unit: UnitEntity;
  role: UserRoleEntity;
  unread?: number;
}

export interface UserDataForChat {
  id: number;
  nickname: string;
}

export interface UserRO extends ResultObject {
  session?: UserData;
  users?: UserDataForChat[];
}

