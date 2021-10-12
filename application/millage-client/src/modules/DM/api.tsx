import {DMState} from '../../modules/DM/types';
import axios from 'axios';
import {SERVER} from '@constants';

export async function apiGetMessageBoxList() : Promise<DMState> {
  const messageboxes = await axios.get(`${SERVER}/message/messagebox/list`,
      {withCredentials: true});

  return messageboxes.data;
}

export async function apiGetMessages(id: number) : Promise<DMState> {
  const messages = await axios.get(`${SERVER}/message/detail/${id}`,
      {withCredentials: true});
  return messages.data;
}


export async function apiSetMessagesAsRead(id: number) : Promise<boolean> {
  await axios.post(`${SERVER}/message/read/${id}`,
      {withCredentials: true});
  return true;
}

export async function deleteMessages(id: number): Promise<DMState> {
  const result = await axios.delete(`${SERVER}/message/${id}`,
      {withCredentials: true});
  return result.data;
}
