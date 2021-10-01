import React, {useEffect} from 'react';
import {useHistory, useParams} from 'react-router';
import {useBoard} from '@hooks/board';
import {Link} from 'react-router-dom';
import PostListItem from '@components/boards/PostListItem';
import {ROOT_PATH} from '@constants';

type BoardViewParams = {
  boardId: string;
}

function BoardViewPage() {
  const {boardId} = useParams<BoardViewParams>();
  const {curBoardState, getBoardById} = useBoard();
  useEffect(() => {
    getBoardById(+boardId);
  }, [boardId, getBoardById]);

  const {loading, data, error} = curBoardState;
  const history = useHistory();
  if (error) {
    history.replace(ROOT_PATH);
  }

  return (
    !loading && data ?

    <div
      className='max-w-screen-2xl py-4 mx-auto
      sm:px-8 sm:py-8'
    >
      <h1 className='text-3xl mb-8'>{data.name}</h1>
      <div className='flex flex-row'>
        {/* Main Component */}
        <div className='
          max-w-screen-lg flex-1 w-full
          p-8 ring-1 ring-gray-500 min-h-screen flex flex-col
        '>

          {/* Board Header */}
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

            { data.authorityToWrite === 'all' &&
              <Link
                to='/create'
                className='px-4 py-2 ring-1 ring-gray-500'
              >
                글 생성
              </Link>
            }
          </div>

          {/* Post List Component */}
          <div className='mt-8'>
            {data.postList?.map(( post ) => (
              <PostListItem post={post} />
            ))}
          </div>

        </div>

        {/* Side Component */}
        <div className='
          hidden lg:block w-72 ml-6
          ring-1 ring-gray-500 min-h-screen flex-col
        '>

        </div>

      </div>
    </div>:

    <div>
      loading...
    </div>
  );
}

export default BoardViewPage;
