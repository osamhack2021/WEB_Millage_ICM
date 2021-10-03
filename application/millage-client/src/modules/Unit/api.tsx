import {UnitState} from './types';
import axios from 'axios';
import {SERVER} from '@constants';


export async function getUnitListApi() : Promise<UnitState> {
  try {
    const list = await axios.get(`${SERVER}/unit/list`);
    return list.data;
  } catch (err: any) {
    return {result: 'error', message: 'Unit list fetch failed'};
  }
}
