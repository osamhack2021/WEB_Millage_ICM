import {ResultObject} from 'src/common/common.interface';

export interface UnitInfo{
    id: number;
    name: string;
    count: number;
}

export interface UnitListRO extends ResultObject {
    units?: UnitInfo[];
}
