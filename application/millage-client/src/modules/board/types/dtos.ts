import {Board} from './entities';

export type GetBoardListRes = {
    result: 'success' | 'fail' | 'error';
    boards?: Board[];
};

export type GetBoardByIdRes = {
    ok: boolean;
    errorMessage?: string;
    board?: Board;
};

export type GetBoardByIdReq = {
    boardId: number;
    page: number;
    search?: string;
};
