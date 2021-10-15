import {createAction, createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {
  CreateBoardReq,
  CreateBoardRes,
  CreatePostReq,
  CreatePostRes,
  GetBoardByIdReq,
  GetBoardByIdRes,
  GetBoardListInput,
  GetBoardListRes,
  GetPostReq,
  GetPostSuccessPayload,
  getRecentScheduleRes,
  getRecruitAndPollListRes,
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
 * Create Board API Actions
 */
export const CREATE_BOARD = 'board/CREATE_BOARD';
export const CREATE_BOARD_SUCCESS = 'board/CREATE_BOARD_SUCCESS';
export const CREATE_BOARD_FAILURE = 'board/CREATE_BOARD_FAILURE';
export const INIT_CREATE_BOARD_STATE = 'board/INIT_CREATE_BOARD_STATE';

export const createBoardAsync = createAsyncAction(
    CREATE_BOARD,
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAILURE,
)<CreateBoardReq, CreateBoardRes, AxiosError>();
export const initiateCreateBoardStateAction = createAction(
    INIT_CREATE_BOARD_STATE,
)();

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
 * Create Post API Actions
 */
export const CREATE_POST = 'board/CREATE_POST';
export const CREATE_POST_SUCCESS = 'board/CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'board/CREATE_POST_FAILURE';
export const INIT_CREATE_POST_STATE = 'board/INIT_CREATE_POST_STATE';

export const createPostAsync = createAsyncAction(
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
)<CreatePostReq, CreatePostRes, AxiosError>();
export const initCreatePostStateAction = createAction(
    INIT_CREATE_POST_STATE,
)();

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


export const GET_RECRUIT_AND_POST_LIST_REQUEST =
'board/GET_RECRUIT_AND_POST_LIST_REQUEST';
export const GET_RECRUIT_AND_POST_LIST_SUCCESS =
'board/GET_RECRUIT_AND_POST_LIST_SUCCESS';
export const GET_RECRUIT_AND_POST_LIST_FAILURE =
'board/GET_RECRUIT_AND_POST_LIST_FAILURE';

export const getRecruitAndPostListAsync = createAsyncAction(
    GET_RECRUIT_AND_POST_LIST_REQUEST,
    GET_RECRUIT_AND_POST_LIST_SUCCESS,
    GET_RECRUIT_AND_POST_LIST_FAILURE,
)<undefined, getRecruitAndPollListRes, AxiosError>();

export const GET_RECENT_SCHEDULE_REQUEST =
'board/GET_RECENT_SCHEDULE_REQUEST';
export const GET_RECENT_SCHEDULE_SUCCESS =
'board/GET_RECENT_SCHEDULE_SUCCESS';
export const GET_RECENT_SCHEDULE_FAILURE =
'board/GET_RECENT_SCHEDULE_FAILURE';

export const getRecentScheduleAsync = createAsyncAction(
    GET_RECENT_SCHEDULE_REQUEST,
    GET_RECENT_SCHEDULE_SUCCESS,
    GET_RECENT_SCHEDULE_FAILURE,
)<undefined, getRecentScheduleRes, AxiosError>();
