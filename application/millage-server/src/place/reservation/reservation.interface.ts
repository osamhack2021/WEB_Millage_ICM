import {ResultObject} from 'src/common/common.interface';
import {ReservationEntity} from './reservation.entity';

export interface ReservationRO extends ResultObject {
  reservation?: ReservationEntity;
}
