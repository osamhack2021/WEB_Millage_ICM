import {DMState} from './types';

export async function apiGetMessageBoxList() : Promise<DMState> {
  const response : DMState = {
    messageboxes: [{
      id: 1,
      name: '박은찬',
      content: '안녕하세요',
      date: '21/09/20 09:21',
    },
    {
      id: 2,
      name: '익명',
      content: '안녕하세요22',
      date: '21/09/19 11:21',
    },
    {
      id: 3,
      name: '박은찬',
      content: '안녕하세요33',
      date: '21/09/10 07:11',
    }],
  };

  return response;
}
