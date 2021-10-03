import {UserSubmitData, UserState, UserLoginData} from './types';
import axios from 'axios';

export async function createUserApi(data: UserSubmitData) : Promise<UserState> {
  try {
    const user = await axios.post('/api/user/register', data);
    return user.data;
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function loginApi(data: UserLoginData) : Promise<UserState> {
  try {
    const user = await axios.post('/api/user/login', data);
    return user.data;
  } catch (err: any) {
    return {result: 'error'};
  }
}

export async function sessionApi() : Promise<UserState> {
  try {
    const session = await axios.get('/api/user/session');
    return session.data;
  } catch (err: any) {
    return {result: 'error'};
  }
}
