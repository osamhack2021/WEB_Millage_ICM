import React, {useCallback, useEffect} from 'react';
import {useHistory} from 'react-router';
import {useBoard, useBoardViewPath} from '@hooks/board';
import {ROOT_PATH} from '@constants';
import {PostListBox, BoardBoxTop} from '@components/boards';


function BoardViewPage() {
  const {boardId, query, prevQuery} = useBoardViewPath();
  const {curBoardState, getBoardById} = useBoard();

  const getBoardWithPage = useCallback(
      (page: number) => {
        if (typeof query === 'string' && query!== '') {
          getBoardById({
            boardId: +boardId,
            page,
            search: query,
          });
        } else {
          getBoardById({
            boardId: +boardId,
            page,
          });
        }
      },
      [boardId, getBoardById, query],
  );

  useEffect(() => {
    if (prevQuery === undefined && query === '') {
      return;
    }
    getBoardWithPage(1);
  }, [boardId, getBoardById, query]);

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
          <BoardBoxTop authorityToWrite={data.authorityToWrite} />

          {/* Post List Component */}
          { data.posts &&
            <PostListBox
              posts={data.posts}
              getBoardWithPage={getBoardWithPage}
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
