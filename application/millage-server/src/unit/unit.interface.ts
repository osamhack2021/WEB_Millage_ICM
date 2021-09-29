import {UnitEntity} from './unit.entity';

export interface UnitListRO {
    result: string;
    message?: string;
    units?: UnitEntity[];
}
