import {POST_PATH, RECRUIT} from '@constants';
import {Post} from '@modules/board/types';
import moment from 'moment';
import 'moment/locale/ko';
import React from 'react';
import {Link} from 'react-router-dom';
import {
  Comment,
  Like,
} from '@images';
import PostTypeIcon from '../../PostTypeIcon';

type Props = Pick<Post,
  'id' | 'title' | 'createdAt' |
  'writer' | 'heartCount' | 'comments' | 'postType' | 'recruitStatus'
>

const PostItem: React.FC<Props> = ({
  id, title, createdAt, writer,
  heartCount, comments, postType, recruitStatus,
}) => {
  return (
    <div className='p-3 border-t border-gray-300'>
      <div className='flex items-center'>
        <Link
          className='mr-4'
          to={`${POST_PATH}/${id}`}
        >
          <h3 className='font-bold text-lg'>
            {title}
          </h3>
        </Link>
        <h4 className='text-gray-500' >
          {moment(createdAt).subtract(9, 'hours').fromNow()}
        </h4>
      </div>

      <div className='flex items-center text-gray-700'>
        <h4 className=' mr-2'>
          {writer.nickname}
        </h4>
        <div className='flex items-center mr-2'>
          <div
            className='h-4 w-4 mr-1 bg-cover'
            style={{backgroundImage: `url(${Like})`}}
          />
          {heartCount}
        </div>
        <div className='flex items-center mr-2'>
          <div
            className='h-4 w-4 mr-1 bg-cover'
            style={{backgroundImage: `url(${Comment})`}}
          />
          {comments.length}
        </div>

        <PostTypeIcon postType={postType} />

        {postType === RECRUIT && recruitStatus &&
          <h4>
            {recruitStatus.currentMember.length}&nbsp;/&nbsp;
            {recruitStatus.totalMember}
          </h4>}
      </div>
    </div>
  );
};

export default PostItem;
