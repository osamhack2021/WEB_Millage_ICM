import {Post} from '@modules/board/types';
import React from 'react';
import PollItem from './PollItem';

type Props = Required<Pick<Post, 'pollItems' | 'isVoter'>> & {
  postId: number;
}

const PollListBox: React.FC<Props> = ({pollItems, isVoter, postId}) => {
  return (
    <div className='flex flex-col'>
      {pollItems.map( (poll) => (
        <PollItem
          key={poll.id}
          content={poll.content}
          postId={postId}
          pollId={poll.id}
        />
      ))}
      {String(isVoter)}
    </div>
  );
};

export default PollListBox;
