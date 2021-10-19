import {Post} from './Post';

export type PostPartial = {
    id: number;
    title: string;
    totalMember: number;
    currentCount: number;
};

export type Schedule = {
  id: number;
  title: string;
  content: string;
  start: string;
  end?: string;
  groupType: string;
  userId: number;
  unitId: number;
}

export type SideBox = {
    posts?: PostPartial[],
    schedules?: Schedule[],
}
