import {
  CreateBoardReq,
  CreateBoardRes,
  CreatePostReq,
  CreatePostRes,
  deleteReplyRes,
  GetBoardByIdReq,
  GetBoardByIdRes,
  GetBoardListInput,
  GetBoardListRes,
  GetPostReq,
  GetPostRes,
  getRecentScheduleRes,
  getRecruitAndPollListRes,
  insertReplyReq,
  insertReplyRes,
  TogglePostHeartReq,
  TogglePostHeartRes,
  ToggleRecruitReq,
  ToggleRecruitRes,
  ToggleVoteReq,
  ToggleVoteRes,
} from './types';
import axios from 'axios';
import {
  CREATE_BOARD_API,
  CREATE_POST_API,
  GET_BOARD_API,
  GET_BOARD_LIST_API,
  GET_BOARD_LIST_WITH_POSTS_API,
  GET_POST_API,
  SERVER,
  TOGGLE_POST_HEART_API,
  TOGGLE_RECRUIT_API,
  TOGGLE_VOTE_API,
} from '@constants';
import {CommonResponse} from '@utils/commonTypes';

/**
 * 커뮤니티의 모든 게시판의 List를 요청하는 API\
 * Use: CreatePost Page, BoardHeader
 * @return {Promise<GetBoardListRes>}
 */
export async function apiGetBoardList(
    {withPosts}: GetBoardListInput,
): Promise<GetBoardListRes> {
  try {
    const API_URL = withPosts ?
      GET_BOARD_LIST_WITH_POSTS_API :
      GET_BOARD_LIST_API;

    const {data} = await axios.get<GetBoardListRes>(
        API_URL,
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
    const API_PATH = search ?
    `${GET_BOARD_API}/${boardId}?page=${page}&search=${search}` :
    `${GET_BOARD_API}/${boardId}?page=${page}`;
    const {data} = await axios.get<GetBoardByIdRes>(
        API_PATH,
        {withCredentials: true},
    );
    return data;
  } catch (error: any) {
    return {result: 'fail', message: error};
  }
}

/**
 * Create Board API
 * @param createBoardReq
 * @returns
 */
export async function apiCreateBoard(
    createBoardReq: CreateBoardReq,
): Promise<CreateBoardRes> {
  try {
    const {data} = await axios.post<CreateBoardRes>(
        CREATE_BOARD_API,
        createBoardReq,
        {withCredentials: true},
    );
    return data;
  } catch (error: any) {
    return {result: 'error', message: error};
  }
}

export async function apiGetPost(
    {postId}: GetPostReq,
): Promise<GetPostRes> {
  try {
    const {data} = await axios.get<GetPostRes>(
        `${GET_POST_API}/${postId}`,
        {withCredentials: true},
    );
    return data;
  } catch (error: any) {
    return {result: 'error', message: error};
  }
}

/*
 * Create Post API
 */
export async function apiCreatePost(
    createPostReq: CreatePostReq,
): Promise<CreatePostRes> {
  try {
    const {data} = await axios.post<CreatePostRes>(
        CREATE_POST_API,
        createPostReq,
        {withCredentials: true},
    );
    return data;
  } catch (error: any) {
    return {result: 'error', message: error};
  }
}

/**
 * Toggle Heart API
 */
export async function apiTogglePostHeart(
    {postId}: TogglePostHeartReq,
): Promise<TogglePostHeartRes> {
  try {
    const {data} = await axios.post<TogglePostHeartRes>(
        `${TOGGLE_POST_HEART_API}/${postId}`, {},
        {withCredentials: true},
    );
    return data;
  } catch (error: any) {
    return {result: 'error', message: error};
  }
}

/**
 * Toggle Vote API
 */
export async function apiToggleVote(
    {postId, pollId}: ToggleVoteReq,
): Promise<ToggleVoteRes> {
  try {
    const {data} = await axios.post<ToggleVoteRes>(
        TOGGLE_VOTE_API(postId, pollId), {},
        {withCredentials: true},
    );
    return data;
  } catch (error: any) {
    return {result: 'error', message: error};
  }
}

/**
 * Toggle Recruit API
 */
export async function apiToggleRecruit(
    {postId}: ToggleRecruitReq,
): Promise<ToggleRecruitRes> {
  try {
    const {data} = await axios.post(
        TOGGLE_RECRUIT_API(postId), {},
        {withCredentials: true},
    );
    return data;
  } catch (error: any) {
    return {result: 'error', message: error};
  }
}

export async function getRecruitAndPollList(
): Promise<getRecruitAndPollListRes> {
  const posts = await axios.get(
      `${SERVER}/board/recruitAndPollList`,
      {withCredentials: true},
  );
  return {
    result: 'success',
    posts: posts.data.posts,
  };
}

export async function getRecentSchedules(
): Promise<getRecentScheduleRes> {
  const posts = await axios.get(
      `${SERVER}/schedule/recentMixed`,
      {withCredentials: true},
  );
  return {
    result: 'success',
    schedules: posts.data.schedules,
  };
}


export async function insertReplyApi(
    param: insertReplyReq,
): Promise<insertReplyRes> {
  const {data} = await axios.post(
      `${SERVER}/post/${param.postId}/comment/`+
      `${param.commentId?param.commentId:''}`,
      {
        content: param.content,
        parentCommentId: param.parentCommentId,
      },
      {withCredentials: true},
  );
  return data;
}

export async function deleteReplyApi(
    param: number,
): Promise<deleteReplyRes> {
  const {data} = await axios.delete(
      `${SERVER}/comment/${param}`,
      {withCredentials: true},
  );
  return data;
}

export async function likeReplyApi(
    param: number,
): Promise<CommonResponse> {
  const {data} = await axios.post(
      `${SERVER}/comment/${param}/heart/`,
      {withCredentials: true},
  );
  return {
    ...data,
  };
}
