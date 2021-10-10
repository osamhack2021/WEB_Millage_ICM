import {Post} from '@modules/board/types';
import React from 'react';
import PollItem from './PollItem';

type Props = Required<Pick<Post, 'pollItems'>>

const PollListBox: React.FC<Props> = ({pollItems}) => {
  return (
    <div className='flex flex-col'>
      {pollItems.map( (poll) => (
        <PollItem key={poll.id} content={poll.content} />
      ))}
    </div>
  );
};

export default PollListBox;
