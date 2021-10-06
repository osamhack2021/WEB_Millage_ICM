import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export interface EventData {
    id: string;
    groupId: string;
    title: string;
    content: string;
    start: Date;
    end?: Date;
    color?: string;
}

export interface Schedules {
  schedules: Array<EventData>;
};

export type ScheduleAction = ActionType<typeof actions>;
