import {
  GetBoardByIdReq,
  GetBoardByIdRes,
  GetBoardListInput,
  GetBoardListRes,
  GetPostReq,
  GetPostRes,
  TogglePostHeartReq,
  TogglePostHeartRes,
} from './types';
import axios from 'axios';
import {
  GET_BOARD_API,
  GET_BOARD_LIST_API,
  GET_BOARD_LIST_WITH_POSTS_API,
  GET_POST_API,
  TOGGLE_POST_HEART_API,
} from '@constants';

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
    const {data} = await axios.post<GetBoardByIdRes>(
        `${GET_BOARD_API}/${boardId}`,
        {page, search},
        {withCredentials: true},
    );
    return data;
  } catch (error: any) {
    return {result: 'fail', message: error};
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
