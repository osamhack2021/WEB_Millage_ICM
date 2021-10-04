import {PaginationResults} from '@utils/commonTypes';
import {Post} from './';

/* Types of Board */
export type Board = {
    id: number;
    name: string;
    authorityToWrite: 'admin' | 'all';
    isPublicWriter: boolean;
    allowImage: boolean;
    allowPoll: boolean;
    allowRecruit: boolean;
    posts?: PaginationResults<Post>;
};
