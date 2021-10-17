import {POST_PATH} from '@constants';
import {Post} from '@modules/board/types';
import {formatDateTime} from '@utils/formatDateTime';
import React from 'react';
import {Link} from 'react-router-dom';

type Props = Pick<Post, 'id' | 'title' | 'createdAt'>

const PostItemTop: React.FC<Props> = ({id, title, createdAt}) => {
  return (
    <div className='w-full flex items-center justify-start flex-nowrap'>
      {/* 제목 */}
      <Link to={`${POST_PATH}/${id}`}>
        <h3
          className='
            text-xl break-all line-clamp-2
            hover:text-green-light transition duration-500
          '
        >
          {title}
        </h3>
      </Link>

      {/* 생성시각 */}
      <h4 className='ml-4 text-gray-500 text-sm whitespace-nowrap' >
        {formatDateTime(createdAt)}
      </h4>
    </div>
  );
};

export default PostItemTop;
