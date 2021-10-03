import React, {useCallback, useEffect} from 'react';
import {useHistory, useParams} from 'react-router';
import {useBoard} from '@hooks/board';
import {ROOT_PATH} from '@constants';
import PostListBox from '@components/boards/PostListBox';
import BoardHeader from '@components/boards/BoardHeader';

type BoardViewParams = {
  boardId: string;
}

function BoardViewPage() {
  const {boardId} = useParams<BoardViewParams>();
  const {curBoardState, getBoardById} = useBoard();

  const paginationFunc = useCallback(
      (page: number) => getBoardById({
        boardId: +boardId,
        page,
      }),
      [boardId, getBoardById],
  );

  useEffect(() => {
    getBoardById({
      boardId: +boardId,
      page: 1,
    });
  }, [boardId, getBoardById]);

  const {loading, data, error} = curBoardState;
  const history = useHistory();
  if (error) {
    history.replace(ROOT_PATH);
  }

  if (!data || loading) {
    return (
      <div>
        loading...
      </div>
    );
  }

  return (
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
          <BoardHeader authorityToWrite={data.authorityToWrite} />

          {/* Post List Component */}
          { data.posts &&
            <PostListBox
              posts={data.posts}
              paginationFunc={paginationFunc}
            /> }

        </div>

        {/* Side Component */}
        <div className='
          hidden lg:block w-72 ml-6
          ring-1 ring-gray-500 min-h-screen flex-col
        '>

        </div>

      </div>
    </div>
  );
}

export default BoardViewPage;
