import {UnitState} from './types';
import axios from 'axios';

export async function getUnitListApi() : Promise<UnitState> {
  try {
    const list = await axios.get('/api/unit/list');
    return list.data;
  } catch (err: any) {
    return {result: 'error', message: 'Unit list fetch failed'};
  }
}
