import {PostEntity} from '../post/post.entity';
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

export interface PaginationObject {
    posts: PostEntity[];
    curPage: number;
    totalCounts: number;
    totalPages: number;
}
