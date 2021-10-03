import React from 'react';
import {Board} from '@modules/board/types';
import {Link} from 'react-router-dom';

type Props = Pick<Board, 'authorityToWrite'>;

const BoardHeader: React.FC<Props> = ({authorityToWrite}) => {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <input
          className='border-b border-gray-500 focus:outline-none p-2'
          type='search'
          placeholder='검색어를 입력하세요'
        />
        <button className='py-2 px-4 border border-gray-500 ml-4'>
          내가 쓴 글
        </button>
      </div>

      { authorityToWrite === 'all' &&
        <Link
          to='/create'
          className='px-4 py-2 ring-1 ring-gray-500'
        >
          글 생성
        </Link>
      }
    </div>
  );
};

export default BoardHeader;
