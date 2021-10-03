import {ResultObject} from 'src/common/common.interface';

export interface UnitInfo{
    name: string;
    count: number;
}

export interface UnitListRO extends ResultObject {
    units?: UnitInfo[];
}
