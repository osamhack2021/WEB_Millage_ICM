import {CommonResponse} from '@utils/commonTypes';
import {Board} from './entities';

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
