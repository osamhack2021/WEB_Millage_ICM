import * as Actions from '../actions';
import {AsyncState} from '@utils/reducerUtils';
import {ActionType} from 'typesafe-actions';
import {Board, Post, SideBox} from './entities';
import {CommonResponse} from '@utils/commonTypes';

export * from './dtos';
export * from './entities';

/* Types for Reducer */
export type BoardState = {
    boardListState: AsyncState<Board[]>;
    curBoardState: AsyncState<Board>;
    postState: AsyncState<Post>;
    sideboxState: AsyncState<SideBox>;
    createPostState: AsyncState<Post>;
    createBoardState: AsyncState<Board>;
    replyState: {
      result: string;
      message?: string;
    };
    starBoardState: {
      loading: boolean;
      error?: boolean;
    }
};

export type BoardAction = ActionType<typeof Actions>;
