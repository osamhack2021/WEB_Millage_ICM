import React from 'react';
import {POST_PATH} from '@constants';
import {Post} from '@modules/board/types';
import {Link} from 'react-router-dom';

type Props = Pick<Post, 'id' | 'content'>

const PostContent: React.FC<Props> = ({id, content}) => {
  return (
    <Link to={`${POST_PATH}/${id}`}>
      <p
        className='
          w-full mt-2
          text-base text-gray-600 line-clamp-2 break-all
        '
        style={{
          lineHeight: '1rem',
        }}
      >
        {content}
      </p>
    </Link>
  );
};

export default PostContent;
