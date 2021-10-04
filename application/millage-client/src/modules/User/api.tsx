import {UserSubmitData, UserState, UserLoginData} from './types';
import axios from 'axios';
import {SERVER} from '@constants';

export async function createUserApi(data: UserSubmitData) : Promise<UserState> {
  try {
    const user = await axios.post(`${SERVER}/user/register`, data,
        {withCredentials: true});
    return user.data;
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function loginApi(data: UserLoginData) : Promise<UserState> {
  try {
    const user = await axios.post(`${SERVER}/user/login`, data,
        {withCredentials: true});
    return user.data;
  } catch (err: any) {
    return {result: 'error'};
  }
}

export async function sessionApi() : Promise<UserState> {
  try {
    const session = await axios.get(`${SERVER}/user/session`,
        {withCredentials: true});
    return session.data;
  } catch (err: any) {
    return {result: 'error'};
  }
}
