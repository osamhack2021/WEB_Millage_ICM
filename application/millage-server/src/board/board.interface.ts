import {BoardEntity} from './board.entity';

export interface BoardListRO {
    result: string;
    message?: string;
    boards?: BoardEntity[];
}