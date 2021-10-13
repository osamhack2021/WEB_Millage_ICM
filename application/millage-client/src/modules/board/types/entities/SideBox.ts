import {Post} from './Post';

export type PostPartial = {
    id: number;
    title: string;
    totalMember: number;
    currentCount: number;
};

export type SideBox = {
    posts: PostPartial[],
}
