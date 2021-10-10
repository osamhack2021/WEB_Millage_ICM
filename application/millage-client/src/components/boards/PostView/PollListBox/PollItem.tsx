import {Poll} from '@modules/board/types';
import React from 'react';

type Props = Pick<Poll, 'content'>

const PollItem: React.FC<Props> = ({content}) => {
  return (
    <div className='ring-1 ring-gray-300 p-2 cursor-pointer' >
      {content}
    </div>
  );
};

export default PollItem;
