import {UserState} from '@modules/User/types';
import {CommonResponse} from '@utils/commonTypes';
import {Board, Post} from './entities';

export type GetBoardListInput = {
    withPosts?: boolean;
}

export type GetBoardListRes = CommonResponse & {
    boards?: Board[];
};

export type GetBoardByIdReq = {
    boardId: number;
    page: number;
    search?: string;
};

export type GetBoardByIdRes = CommonResponse & {
    board?: Board;
};

export type GetPostReq = {
    postId: number;
}

export type GetPostRes = CommonResponse & {
    post?: Post;
}

export type GetPostSuccessPayload =
    GetPostRes & Required<Pick<UserState, 'session'>>
