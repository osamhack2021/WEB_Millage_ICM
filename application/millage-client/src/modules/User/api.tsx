import {UserSubmitData, UserState} from './types';
import axios from 'axios';

export async function createUserApi(data: UserSubmitData) : Promise<UserState> {
  try {
    const user = await axios.post('/user/register', data);
    if (user) {
      return {result: 'success'};
    } else {
      return {result: 'fail'};
    }
  } catch (err: any) {
    return {result: 'fail'};
  }
}
