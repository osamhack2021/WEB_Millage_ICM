import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {
  GetBoardByIdReq,
  GetBoardByIdRes,
  GetBoardListInput,
  GetBoardListRes,
  GetPostReq,
  GetPostSuccessPayload,
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
