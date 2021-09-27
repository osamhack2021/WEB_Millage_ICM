import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {GetBoardListRes} from './types';

export const GET_BOARD_LIST = 'board/GET_BOARD_LIST';
export const GET_BOARD_LIST_SUCCESS = 'board/GET_BOARD_LIST_SUCCESS';
export const GET_BOARD_LIST_ERROR = 'board/GET_BOARD_LIST_ERROR';

export const getBoardListAsync = createAsyncAction(
    GET_BOARD_LIST,
    GET_BOARD_LIST_SUCCESS,
    GET_BOARD_LIST_ERROR,
)<undefined, GetBoardListRes, AxiosError>();
