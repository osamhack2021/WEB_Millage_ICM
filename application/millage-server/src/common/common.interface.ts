/* eslint-disable no-unused-vars */
export enum Result {
    SUCCESS = 'success',
    FAIL = 'fail',
    ERROR = 'error',
}

export interface ResultObject {
    result: Result;
    message?: string;
}
