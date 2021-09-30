import {
  Board,
  GetBoardByIdReq,
  GetBoardByIdRes,
  GetBoardListRes,
} from './types';
import {wait} from '@utils/timer';

/**
 * 커뮤니티의 모든 게시판의 List를 요청하는 API\
 * Use: CreatePost Page
 * @return {Promise<GetBoardListRes>}
 */
export async function apiGetBoardList(): Promise<GetBoardListRes> {
  try {
    await wait(500);
    return {boardList: mockBoardList};
  } catch (error) {
    return {boardList: []};
  }
}
const mockBoardList: Board[] = [
  {
    id: 1,
    name: '칭찬게시판',
    authorityToWrite: 'all',
    allowImage: false,
    allowPoll: false,
    allowRecruit: false,
    isPublicWriter: true,
  },
  {
    id: 2,
    name: '설문게시판',
    authorityToWrite: 'all',
    allowImage: true,
    allowPoll: true,
    allowRecruit: false,
    isPublicWriter: false,
  },
  {
    id: 3,
    name: '인원모집',
    authorityToWrite: 'all',
    allowImage: true,
    allowPoll: false,
    allowRecruit: true,
    isPublicWriter: true,
  },
];

/**
 * 게시판 정보를 받는 API\
 * Board View 페이지에서 호출
 */
export async function apiGetBoardById(
    {boardId}: GetBoardByIdReq,
): Promise<GetBoardByIdRes> {
  try {
    await wait(500);
    return mockResponses.find( (r) => r.board?.id === boardId ) || mockResFail;
  } catch (error: any) {
    return {ok: false, errorMessage: error};
  }
}

const mockRes1: GetBoardByIdRes = {
  ok: true,
  board: {
    id: 1,
    name: '자유게시판',
    authorityToWrite: 'all',
    allowPoll: true,
    allowRecruit: true,
    allowImage: true,
    isPublicWriter: false,
    postList: [],
  },
};

const mockRes2: GetBoardByIdRes = {
  ok: true,
  board: {
    id: 2,
    name: '설문게시판',
    authorityToWrite: 'all',
    allowPoll: true,
    allowRecruit: false,
    allowImage: true,
    isPublicWriter: true,
    postList: [],
  },
};

const mockRes3: GetBoardByIdRes = {
  ok: true,
  board: {
    id: 3,
    name: '공지게시판',
    authorityToWrite: 'admin',
    allowPoll: true,
    allowRecruit: false,
    allowImage: true,
    isPublicWriter: true,
    postList: [],
  },
};

const mockResFail: GetBoardByIdRes = {
  ok: false,
  errorMessage: 'Access Forbidden',
};

const mockResponses: GetBoardByIdRes[] = [
  mockRes1, mockRes2, mockRes3, mockResFail,
];
