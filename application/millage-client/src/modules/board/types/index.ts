import * as Actions from '../actions';
import {AsyncState} from '@utils/reducerUtils';
import {ActionType} from 'typesafe-actions';
import {Board, Post} from './entities';

export * from './dtos';
export * from './entities';

/* Types for Reducer */
export type BoardState = {
    boardListState: AsyncState<Board[]>;
    curBoardState: AsyncState<Board>;
    postState: AsyncState<Post>;
};

export type BoardAction = ActionType<typeof Actions>;
