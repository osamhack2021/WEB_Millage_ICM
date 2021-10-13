import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {
  GetBoardByIdReq,
  GetBoardByIdRes,
  GetBoardListInput,
  GetBoardListRes,
  GetPostReq,
  GetPostSuccessPayload,
  TogglePostHeartReq,
  TogglePostHeartRes,
  ToggleRecruitReq,
  ToggleRecruitRes,
  ToggleVoteReq,
  ToggleVoteRes,
} from './types';

/**
 * GET Board List API Actions
 */
export const GET_BOARD_LIST = 'board/GET_BOARD_LIST';
export const GET_BOARD_LIST_SUCCESS = 'board/GET_BOARD_LIST_SUCCESS';
export const GET_BOARD_LIST_ERROR = 'board/GET_BOARD_LIST_ERROR';

export const getBoardListAsync = createAsyncAction(
    GET_BOARD_LIST,
    GET_BOARD_LIST_SUCCESS,
    GET_BOARD_LIST_ERROR,
)<GetBoardListInput, GetBoardListRes, AxiosError>();


/**
 * GET Board by id API Actions
 */
export const GET_BOARD_BY_ID = 'board/GET_BOARD_BY_ID';
export const GET_BOARD_BY_ID_SUCCESS = 'board/GET_BOARD_BY_ID_SUCCESS';
export const GET_BOARD_BY_ID_FAILURE = 'board/GET_BOARD_BY_ID_FAILURE';

export const getBoardByIdAsync = createAsyncAction(
    GET_BOARD_BY_ID,
    GET_BOARD_BY_ID_SUCCESS,
    GET_BOARD_BY_ID_FAILURE,
)<GetBoardByIdReq, GetBoardByIdRes, AxiosError>();


/**
 * GET Post API Actions
 */
export const GET_POST = 'board/GET_POST';
export const GET_POST_SUCCESS = 'board/GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'board/GET_POST_FAILURE';

export const getPostAsync = createAsyncAction(
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
)<GetPostReq, GetPostSuccessPayload, AxiosError>();


/**
 * POST Toggle Post Heart API Actions
 */
export const TOGGLE_POST_HEART = 'board/TOGGLE_POST_HEART';
export const TOGGLE_POST_HEART_SUCCESS = 'board/TOGGLE_POST_HEART_SUCCESS';
export const TOGGLE_POST_HEART_FAILURE = 'board/TOGGLE_POST_HEART_FAILURE';

export const togglePostHeartAsync = createAsyncAction(
    TOGGLE_POST_HEART,
    TOGGLE_POST_HEART_SUCCESS,
    TOGGLE_POST_HEART_FAILURE,
)<TogglePostHeartReq, TogglePostHeartRes, AxiosError>();

/**
 * POST Toggle Vote API Actions
 */
export const TOGGLE_VOTE = 'board/TOGGLE_VOTE';
export const TOGGLE_VOTE_SUCCESS = 'board/TOGGLE_VOTE_SUCCESS';
export const TOGGLE_VOTE_FAILURE = 'board/TOGGLE_VOTE_FAILURE';

export const toggleVoteAsync = createAsyncAction(
    TOGGLE_VOTE,
    TOGGLE_VOTE_SUCCESS,
    TOGGLE_VOTE_FAILURE,
)<ToggleVoteReq, ToggleVoteRes, AxiosError>();

/**
 * POST Toggle Recruit API Actions
 */
export const TOGGLE_RECRUIT = 'board/TOGGLE_RECRUIT';
export const TOGGLE_RECRUIT_SUCCESS = 'board/TOGGLE_RECRUIT_SUCCESS';
export const TOGGLE_RECRUIT_FAILURE = 'board/TOGGLE_RECRUIT_FAILURE';

export const toggleRecruitAsync = createAsyncAction(
    TOGGLE_RECRUIT,
    TOGGLE_RECRUIT_SUCCESS,
    TOGGLE_RECRUIT_FAILURE,
)<ToggleRecruitReq, ToggleRecruitRes, AxiosError>();
