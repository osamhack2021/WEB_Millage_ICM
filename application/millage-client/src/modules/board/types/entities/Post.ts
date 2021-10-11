import {NORMAL, POLL, RECRUIT} from '@constants';
import {UserData} from '@modules/User/types';
import {Poll, PollInputs, RecruitStatus, Board} from './';

/* Types of Post */
export type PostType =
  | typeof NORMAL
  | typeof POLL
  | typeof RECRUIT

export type Post = {
    id: number;
    board: Board;
    postType: PostType;
    title: string;
    content?: string;
    createdAt: Date;
    writer: UserData;
    hearts: UserData[];
    heartCount: number;
    hasHearted: boolean;
    comments: Comment[];
    pollItems?: Poll[];
    images?: string[];
    recruitStatus?: RecruitStatus;
};

export type PostInputs = Pick<Post,
    | 'postType'
> & Partial<Pick<Post,
    | 'title'
    | 'content'
    | 'images'
>> & {
    pollInputs?: PollInputs[];
    recruitTotal?: number;
};
