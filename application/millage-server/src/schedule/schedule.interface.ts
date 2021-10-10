import {ResultObject} from '../common/common.interface';

export interface SchedulesRO extends ResultObject {
  schedules?: ScheduleEntity[];
}
