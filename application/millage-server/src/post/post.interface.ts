/* eslint-disable no-unused-vars */
import {ResultObject} from 'src/common/common.interface';
import {PostEntity} from './post.entity';

export interface PostRO extends ResultObject {
    post?: PostEntity;
    isVoter?: boolean;
}

export enum PostType {
    NORMAL = 'NORMAL',
    POLL = 'POLL',
    RECRUIT = 'RECRUIT',
}
