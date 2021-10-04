import {NORMAL, POLL, RECRUIT} from '@constants';
import {UserData} from '@modules/User/types';
import {Poll, PollInputs, RecruitStatus} from './';

/* Types of Post */
export type PostType =
  | typeof NORMAL
  | typeof POLL
  | typeof RECRUIT

export type Post = {
    id: number;
    postType: PostType;
    title: string;
    content?: string;
    imageURL?: string;
    writer: UserData;
    created: Date;
    likeCount: number;
    comments: Comment[];
    polls?: Poll[];
    recruitStatus?: RecruitStatus;
};

export type PostInputs = Pick<Post,
    | 'postType'
> & Partial<Pick<Post,
    | 'title'
    | 'content'
    | 'imageURL'
>> & {
    pollInputs?: PollInputs[];
    recruitTotal?: number;
};
