import * as Actions from './actions';
import {ActionType} from 'typesafe-actions';
import {NORMAL, POLL, RECRUIT} from '@constants';
import {UserData} from '@modules/User/types';
import {AsyncState} from '@utils/reducerUtils';

/* Types of Board */
export type Board = {
    id: number;
    name: string;
    authorityToWrite: 'admin' | 'all';
    isPublicWriter: boolean;
    allowImage: boolean;
    allowPoll: boolean;
    allowRecruit: boolean;
    postList?: Post[];
}

/* Types of Post */
export type PostType =
  | typeof NORMAL
  | typeof POLL
  | typeof RECRUIT

export type Post = {
    id: number;
    postType: PostType;
    title: string;
    content: string;
    imageURL: string;
    writer: UserData;
    created: Date;
    likeCount: number;
    comments: Comment[];
    polls?: Poll[];
    recruitStatus?: RecruitStatus;
}

export type PostInputs = Pick<Post,
    | 'postType'
> & Partial<Pick<Post,
    | 'title'
    | 'content'
    | 'imageURL'
>> & {
    pollInputs?: PollInputs[];
    recruitTotal?: number;
}

/* Types of Comment */
export type Comment = {
    id: number;
    content: string;
}

/* Types of Poll */
export type Poll = {
    id: number;
    content: string;
    votes: number;
}

export type PollInputs = Pick<Poll, 'content'> & {
    index: number;
}

/* Types of Recruit */
export type RecruitStatus = {
    status: 'progress' | 'completed'
    totalMember: number;
    currentMember: number;
}


/* Response Types */
export type GetBoardListRes = {
    boardList: Board[]
}

export type GetBoardByIdRes = {
    ok: boolean;
    errorMessage?: string;
    board?: Board;
}

export type GetBoardByIdReq = {
    boardId: number;
}


/* Types for Reducer */
export type BoardState = {
    boardListState: AsyncState<Board[]>;
    curBoardState: AsyncState<Board>;
}

export type BoardAction = ActionType<typeof Actions>
