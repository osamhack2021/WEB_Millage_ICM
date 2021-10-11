import {UserData} from '@modules/User/types';

/* Types of Recruit */
export type RecruitStatus = {
    status: 'progress' | 'completed'
    totalMember: number;
    currentMember: UserData[];
};
