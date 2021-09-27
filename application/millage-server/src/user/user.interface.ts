import {UnitEntity} from 'src/unit/unit.entity';

export interface UserData {
  id: number;
  username: string;
  email: string;
  fullname: string;
  nickname: string;
  phonenumber: string;
  unitId: number;
  auth: number;
}

export interface UserRO {
  result: string;
  session?: UserData;
  message?: string;
}

export interface DefaultRO {
  result: string;
}
