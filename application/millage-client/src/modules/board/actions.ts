import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {GetBoardByIdReq, GetBoardByIdRes, GetBoardListRes} from './types';

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
)<undefined, GetBoardListRes, AxiosError>();


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
