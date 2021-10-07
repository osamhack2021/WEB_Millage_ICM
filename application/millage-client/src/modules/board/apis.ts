import {
  GetBoardByIdReq,
  GetBoardByIdRes,
  GetBoardListRes,
} from './types';
import axios from 'axios';
import {wait} from '@utils/timer';
import {GET_BOARD_LIST_API} from '@constants';

/**
 * 커뮤니티의 모든 게시판의 List를 요청하는 API\
 * Use: CreatePost Page, BoardHeader
 * @return {Promise<GetBoardListRes>}
 */
export async function apiGetBoardList(): Promise<GetBoardListRes> {
  try {
    const {data} = await axios.get<GetBoardListRes>(
        GET_BOARD_LIST_API,
        {withCredentials: true},
    );
    return data;
  } catch (error) {
    return {result: 'error'};
  }
}

/**
 * 게시판 정보를 받는 API\
 * Board View 페이지에서 호출
 */
export async function apiGetBoardById(
    {boardId, page, search}: GetBoardByIdReq,
): Promise<GetBoardByIdRes> {
  try {
    console.log('boardId: ' + boardId);
    console.log('page: ' + page);
    console.log('search: ' + search);
    await wait(500);
    // return mockResponses.find(
    //   (r) => r.board?.id === boardId
    // ) || mockResFail;
    switch (page) {
      // case 1: return mockRes11;
      // case 2: return mockRes12;
      // case 3: return mockRes13;
      default: return mockResFail;
    }
  } catch (error: any) {
    return {ok: false, errorMessage: error};
  }
}

// const mockUser: UserData = {
//   id: 1,
//   username: 'TestUser',
//   unit: {
//     id: 1,
//     name: 'test',
//   },
//   role: {
//     id: 1,
//     role: 'admin',
//   },
//   email: 'test@test.com',
//   fullname: 'Test Test',
//   nickname: 'TestUser',
//   phonenumber: '010-0000-0000',
// };

// const mockPost1: Post = {
//   id: 1,
//   title: 'test1',
//   content: 'test',
//   created: new Date('2021-10-01T10:00:00'),
//   comments: [],
//   likeCount: 0,
//   postType: 'NORMAL',
//   writer: mockUser,
// };

// const mockRes11: GetBoardByIdRes = {
//   ok: true,
//   board: {
//     id: 1,
//     name: '자유게시판',
//     authorityToWrite: 'all',
//     allowPoll: true,
//     allowRecruit: true,
//     allowImage: true,
//     isPublicWriter: false,
//     posts: {
//       curPage: 1,
//       totalCounts: 12,
//       totalPages: 3,
//       results: [
//         mockPost1,
//         mockPost1,
//         mockPost1,
//         mockPost1,
//         mockPost1,
//       ],
//     },
//   },
// };

// const mockRes12: GetBoardByIdRes = {
//   ok: true,
//   board: {
//     id: 1,
//     name: '자유게시판',
//     authorityToWrite: 'all',
//     allowPoll: true,
//     allowRecruit: true,
//     allowImage: true,
//     isPublicWriter: false,
//     posts: {
//       curPage: 2,
//       totalCounts: 12,
//       totalPages: 3,
//       results: [
//         mockPost1,
//         mockPost1,
//         mockPost1,
//         mockPost1,
//         mockPost1,
//       ],
//     },
//   },
// };

// const mockRes13: GetBoardByIdRes = {
//   ok: true,
//   board: {
//     id: 1,
//     name: '자유게시판',
//     authorityToWrite: 'all',
//     allowPoll: true,
//     allowRecruit: true,
//     allowImage: true,
//     isPublicWriter: false,
//     posts: {
//       curPage: 3,
//       totalCounts: 12,
//       totalPages: 3,
//       results: [
//         mockPost1,
//         mockPost1,
//       ],
//     },
//   },
// };

// const mockRes2: GetBoardByIdRes = {
//   ok: true,
//   board: {
//     id: 2,
//     name: '설문게시판',
//     authorityToWrite: 'all',
//     allowPoll: true,
//     allowRecruit: false,
//     allowImage: true,
//     isPublicWriter: true,
//   },
// };

// const mockRes3: GetBoardByIdRes = {
//   ok: true,
//   board: {
//     id: 3,
//     name: '공지게시판',
//     authorityToWrite: 'admin',
//     allowPoll: true,
//     allowRecruit: false,
//     allowImage: true,
//     isPublicWriter: true,
//   },
// };

const mockResFail: GetBoardByIdRes = {
  ok: false,
  errorMessage: 'Access Forbidden',
};

// const mockResponses: GetBoardByIdRes[] = [
//   mockRes11, mockRes2, mockRes3, mockResFail,
// ];
