import {UserState} from '@modules/User/types';
import {CommonResponse} from '@utils/commonTypes';
import {Board, Post, PostPartial, Schedule, Comment} from './entities';

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

export type CreateBoardReq = Pick<Board,
    'title' | 'description' | 'auth' | 'anonymous' |
    'pollAllowed' |'recruitAllowed'
> & {
    unitId: number;
}

export type CreateBoardRes = CommonResponse & {
    board?: Board;
}

export type GetPostReq = {
    postId: number;
}

export type GetPostRes = CommonResponse & {
    post?: Post;
}

export type GetPostSuccessPayload =
    GetPostRes & Required<Pick<UserState, 'session'>>

export type CreatePostReq = Pick<
    Post, 'postType' | 'title' | 'content'
> & {
    boardId: number;
    pollList?: string[];
    totalMember?: number;
}

export type CreatePostRes = CommonResponse & {
    post?: Post;
}

export type DeletePostReq = {
    postId: number;
}

export type DeletePostRes = CommonResponse

export type TogglePostHeartReq = {
    postId: number;
}

export type TogglePostHeartRes = CommonResponse

export type ToggleVoteReq = {
    postId: number;
    pollId: number;
}
// export type ToggleVoteReq = Pick<UserState, 'session'> & {
//     postId: number;
//     pollId: number;
// }

export type ToggleVoteRes = CommonResponse & Pick<Post, 'pollItems'>;

export type ToggleRecruitReq = {
    postId: number,
}

export type ToggleRecruitRes = CommonResponse & Pick<
    Post, 'recruitStatus'
>;

export type getRecruitAndPollListRes = CommonResponse & {
    posts: PostPartial[],
};

export type getRecentScheduleRes = CommonResponse & {
    schedules: Schedule[],
};

export type insertReplyReq = {
    commentId?: number;
    content: string;
    postId: number;
    parentCommentId?: number;
};

export type insertReplyRes = CommonResponse & {
    comment: Comment;
};

export type deleteReplyRes = CommonResponse & {
    id: number;
    comment?: Comment;
};

export type toggleBoardStarRes = CommonResponse & {
    id: number;
};
