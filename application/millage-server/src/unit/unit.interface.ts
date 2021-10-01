export interface UnitInfo{
    id: number;
    name: string;
    count: number;
}

export interface UnitListRO {
    result: string;
    message?: string;
    units?: UnitInfo[];
}
