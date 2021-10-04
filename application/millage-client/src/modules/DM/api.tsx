import {DMState} from '../../modules/DM/types';
import axios from 'axios';
import {SERVER} from '@constants';

export async function apiGetMessageBoxList() : Promise<DMState> {
  const messageboxes = await axios.get(`${SERVER}/message/messagebox/list`,
      {withCredentials: true});

  return messageboxes.data;
}
