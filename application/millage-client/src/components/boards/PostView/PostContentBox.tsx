import {Post} from '@modules/board/types';
import React from 'react';

type Props = Pick<Post, 'title' | 'content' >

const PostContentBox: React.FC<Props> = ({title, content}) => {
  return (
    <div>
      <h1
        className='text-lg sm:text-2xl mb-2 break-all'
      >
        {title}
      </h1>
      <p
        className='text-sm sm:text-base mb-4 break-all'
      >
        {content?.split('\n').map((line) => <p>{line}</p>)}
      </p>
    </div>
  );
};

export default PostContentBox;
