import React from 'react';
import {Board} from '@modules/board/types';
import {Link} from 'react-router-dom';
import {BOARD_PATH} from '@constants';
import NoPosts from './NoPosts';
import {CreatePostButton, PostListItem} from '@components/boards/boardCommons';

type Props = Pick<Board, 'id' | 'title' | 'posts'>

const BoardItem: React.FC<Props> = ({id, title, posts}) => {
  return (
    <div className='
      ring-1 ring-gray-300 divide-y divide-gray-300 flex flex-col
    ' >
      <div className='
        px-3 py-4 ring-1 ring-gray-300
        flex flex-row items-center justify-between
      '>
        <Link
          to={`${BOARD_PATH}/${id}`}
          className='text-green text-lg font-bold hover:underline'
        >
          {title}
        </Link>

        <CreatePostButton type='main' />
      </div>

      { posts && JSON.stringify(posts) !== JSON.stringify([]) ?
        posts.map((post) => (
          <PostListItem key={post.id} post={post} type='main' />
        )) :
        <NoPosts />
      }
    </div>
  );
};

export default BoardItem;
