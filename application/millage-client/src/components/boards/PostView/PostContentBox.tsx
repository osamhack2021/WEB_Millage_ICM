import {Post} from '@modules/board/types';
import React from 'react';

type Props = Pick<Post, 'title' | 'content' >

const PostContentBox: React.FC<Props> = ({title, content}) => {
  return (
    <div>
      <h1 className='text-2xl' > {title} </h1>
      <p> {content} </p>
    </div>
  );
};

export default PostContentBox;
