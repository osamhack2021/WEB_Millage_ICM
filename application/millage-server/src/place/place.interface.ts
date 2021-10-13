import {ResultObject} from '../common/common.interface';
import {PlaceEntity} from './place.entity';

export interface PlaceListRO extends ResultObject {
  placeList?: PlaceEntity[];
}

export interface PlaceRO extends ResultObject {
  place?: PlaceEntity;
}
