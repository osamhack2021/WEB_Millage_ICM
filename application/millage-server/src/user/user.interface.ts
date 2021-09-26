import { UnitEntity } from "src/unit/unit.entity";

export interface UserData {
  id: number;
  username: string;
  email: string;
  fullname: string;
  nickname: string;
  phonenumber: string;
  unit: UnitEntity;
}

export interface UserRO {
  user: UserData;
}

export interface DefaultRO {
  result: string;
}