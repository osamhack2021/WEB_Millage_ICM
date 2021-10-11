import {RecruitStatus} from '@modules/board/types';
import React from 'react';

type Props = RecruitStatus

const RecruitBox: React.FC<Props> = ({
  status, totalMember, currentMember,
}) => {
  return (
    <div>
      {status}
      {currentMember.length}
      {totalMember}
    </div>
  );
};

export default RecruitBox;
