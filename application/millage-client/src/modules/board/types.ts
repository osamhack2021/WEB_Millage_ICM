import * as Actions from './actions'
import { ActionType } from "typesafe-actions"

export type Board = {
    id: number;
    name: string;
    isPublicWriter: boolean;
    allowImage: boolean;
    allowPoll: boolean;
    allowRecruit: boolean;
}

export type GetBoardListRes = {
    boardList: Board[]
}

export type BoardState = {
    boardList: Board[];
    curBoard?: Board;
}

export type BoardAction = ActionType<typeof Actions>
