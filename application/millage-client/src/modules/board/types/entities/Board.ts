import {UnitObject} from '@modules/Unit/types';
import {PaginationResults} from '@utils/commonTypes';
import {Post} from './';

/* Types of Board */
export type Board = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    auth: AuthType;
    anonymous: boolean;
    pollAllowed: boolean;
    recruitAllowed: boolean;
    imageAllowed: boolean;
    unit: UnitObject;
    posts?: Post[];
    paginationObject: PaginationResults<Post>;
};

export enum AuthType {
    ALL = 0,
    ADMIN = 1,
};
