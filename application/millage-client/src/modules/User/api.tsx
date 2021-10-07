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

    const unread = await axios.get(`${SERVER}/message/unread`,
        {withCredentials: true});

    const ro = session.data;
    ro.unread = unread.data;
    return ro;
  } catch (err: any) {
    return {result: 'error'};
  }
}

export async function updateUnreadApi() : Promise<UserState> {
  try {
    const unread = await axios.get(`${SERVER}/message/unread`,
        {withCredentials: true});
    return {
      result: 'success',
      unread: unread.data,
    };
  } catch (err: any) {
    return {result: 'error'};
  }
}
