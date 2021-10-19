import {UserData} from '@modules/User/types';

/* Types of Poll */
export type Poll = {
    id: number;
    postId: number;
    content: string;
    voters: UserData[];
};

export type PollInputs = Pick<Poll, 'content'> & {
    index: number;
};
