import {POST_PATH} from '@constants';
import {Post} from '@modules/board/types';
import {formatDateTime} from '@utils/formatDateTime';
import React from 'react';
import {Link} from 'react-router-dom';

type Props = Pick<Post, 'id' | 'title' | 'createdAt'> & {
  type: 'main' | 'boardView'
}

const PostItemTop: React.FC<Props> = ({
  id, title, createdAt, type,
}) => {
  return (
    <div className='w-full flex items-center justify-start flex-nowrap'>
      {/* 제목 */}
      <Link to={`${POST_PATH}/${id}`}>
        <h3
          className={`
            ${type === 'main' ? 'text-lg' : 'text-xl'}
            break-all line-clamp-2
            hover:text-green-light transition duration-500
          `}
          style={{
            lineHeight: `${type === 'main' ? '1.125rem' : '1.75rem'}`,
          }}
        >
          {title}
        </h3>
      </Link>

      {/* 생성시각 */}
      <h4
        className='ml-4 text-gray-500 text-sm whitespace-nowrap'
        style={{
          lineHeight: `${type === 'main' ? '0.875rem' : '1.25rem'}`,
        }}
      >
        {formatDateTime(createdAt)}
      </h4>
    </div>
  );
};

export default PostItemTop;
