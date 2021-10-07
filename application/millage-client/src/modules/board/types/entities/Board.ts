import {UnitObject} from '@modules/Unit/types';
import {PaginationResults} from '@utils/commonTypes';
import {Post} from './';

/* Types of Board */
export type Board = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    auth: number;
    anonymous: boolean;
    pollAllowed: boolean;
    recruitAllowed: boolean;
    imageAllowed: boolean;
    unit: UnitObject;
    posts?: PaginationResults<Post>;
};
