import {POST_PATH} from '@constants';
import {Post} from '@modules/board/types';
import React from 'react';
import {Link} from 'react-router-dom';

type Props = Pick<Post, 'id' | 'title'>

const PostItem: React.FC<Props> = ({id, title}) => {
  return (
    <div className='p-3 border-t border-gray-300'>
      <Link to={`${POST_PATH}/${id}`}>
        {title}
      </Link>
    </div>
  );
};

export default PostItem;
