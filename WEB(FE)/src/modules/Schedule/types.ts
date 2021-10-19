import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export interface Schedule {
  id: string;
  groupId: groupType;
  title: string;
  content: string;
  start: Date;
  end?: Date;
}

export type ScheduleList = Array<Schedule>

type groupType = 'person' | 'unit'

export interface ScheduleRes {
  id: number;
  title: string;
  content: string;
  start: string;
  end: string | null;
  groupType: groupType;
  userId?: number;
  unitId?: number;
}

export interface GetScheduleListRes {
  result: string;
  schedules: Array<ScheduleRes>;
}

export interface CreateScheduleReq {
  title: string;
  content: string;
  start: string;
  end: string | null;
}
export interface CreateScheduleRes {
  schedule: ScheduleRes;
  result: string;
}

export interface UpdateScheduleReq extends CreateScheduleReq {
  id: string;
}
export interface UpdateScheduleRes extends CreateScheduleRes {}

export interface DeleteScheduleReq {
  id: string;
}
export interface DeleteScheduleRes {
  result: string;
}

export interface ScheduleState{
  result: string;
  message?: string;
  schedules: ScheduleList;
}

export interface ErrorRes {
  result: string;
  message?: string;
}

export type ScheduleAction = ActionType<typeof actions>;
