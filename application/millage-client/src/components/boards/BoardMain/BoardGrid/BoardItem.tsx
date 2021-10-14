import React from 'react';
import {Board} from '@modules/board/types';
import PostItem from './PostItem';
import {Link} from 'react-router-dom';
import {BOARD_PATH} from '@constants';
import NoPosts from './NoPosts';

type Props = Pick<Board, 'id' | 'title' | 'posts'>

const BoardItem: React.FC<Props> = ({id, title, posts}) => {
  return (
    <div className='ring-1 ring-gray-300 flex flex-col' >
      <div className='
        px-3 py-4 ring-1 ring-gray-300
        text-green text-lg font-bold
      '>
        <Link to={`${BOARD_PATH}/${id}`}> {title} </Link>
      </div>

      { posts && JSON.stringify(posts) !== JSON.stringify([]) ?
        posts.map((post) => (
          <PostItem key={post.id} {...post} />
        )) :
        <NoPosts />
      }
    </div>
  );
};

export default BoardItem;
