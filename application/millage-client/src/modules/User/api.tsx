import {UserData, UserState} from './types';
import axios from 'axios';

export async function createUserApi(data: UserData) : Promise<UserState> {
  try {
    const user : UserState = await axios.post('/user/register', data);
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
}
