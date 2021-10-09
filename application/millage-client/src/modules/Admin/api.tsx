import {Role} from '@constants';
import axios from 'axios';
import {SERVER} from '@constants';
import {AdminState} from './types';

export async function getUserList(role: string): Promise<AdminState> {
  try {
    const users = await axios.get(`${SERVER}/user/role/${role}`,
        {withCredentials: true});
    return users.data;
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}
