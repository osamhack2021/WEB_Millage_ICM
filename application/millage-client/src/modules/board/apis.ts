import {GetBoardListRes} from './types';

// user의 community_id 넘겨주어야 함
export async function apiGetBoardList(): Promise<GetBoardListRes> {
  const response: GetBoardListRes = {
    boardList: [
      {
        id: 1,
        name: '칭찬게시판',
        allowImage: false,
        allowPoll: false,
        allowRecruit: false,
        isPublicWriter: true,
      },
      {
        id: 2,
        name: '설문게시판',
        allowImage: true,
        allowPoll: true,
        allowRecruit: false,
        isPublicWriter: false,
      },
      {
        id: 3,
        name: '인원모집',
        allowImage: true,
        allowPoll: false,
        allowRecruit: true,
        isPublicWriter: true,
      },
    ],
  };

  return response;
}
