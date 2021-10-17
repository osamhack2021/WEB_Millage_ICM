import {NORMAL, POLL, RECRUIT} from '@constants';
import {UserData} from '@modules/User/types';
import {Comment} from './Comment';
import {Poll, RecruitStatus, Board} from './';

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
    createdAt: string;
    writer: UserData;
    hearts: UserData[];
    heartCount: number;
    hasHearted: boolean;
    comments: Comment[];
    pollItems?: Poll[];
    isVoter?: boolean;
    images?: string[];
    recruitStatus?: RecruitStatus;
};
