import React from 'react';
import {Post} from '@modules/board/types';
import {StyleOverWriteProps} from '@utils/commonTypes';

type Props = Required<Pick<Post, 'recruitStatus'>> & StyleOverWriteProps

const RecruitStatus: React.FC<Props> = ({recruitStatus, className}) => {
  return (
    <span className={`${className}`} >
      {recruitStatus.currentMember.length}명
      /&nbsp;
      {recruitStatus.totalMember}명
    </span>
  );
};

export default RecruitStatus;
