import {BoardEntity} from './board.entity';

export interface BoardListRO {
    result: string;
    message?: string;
    boards?: BoardEntity[];
}

export interface BoardRO {
    result: string;
    message?: string;
    board?: BoardEntity;
}
