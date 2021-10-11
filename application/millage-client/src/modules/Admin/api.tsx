import {Role} from '@constants';
import axios from 'axios';
import {SERVER} from '@constants';
import {AdminState} from './types';

export async function getUserList(role: string): Promise<AdminState> {
  try {
    const users = await axios.get(`${SERVER}/user/role/NORMAL_USER`,
        {withCredentials: true});
    const adminUsers = await axios.get(`${SERVER}/user/role/ADMIN`,
        {withCredentials: true});
    users.data.users = [...users.data.users, ...adminUsers.data.users];
    return users.data;
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function authUserApi(id: number) : Promise<AdminState> {
  try {
    const result = await axios.patch(`${SERVER}/user/${id}`, {
      id: id,
      isConfirmed: true,
    }, {withCredentials: true});

    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}
