import {ResultObject} from '../common/common.interface';
import {PlaceEntity} from './place.entity';

export interface PlaceRO extends ResultObject {
  places?: PlaceEntity;
}
