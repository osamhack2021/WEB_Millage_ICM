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
      className=''
    >
      {/* Title */}
      <h1 className='text-3xl mb-4 p-6 ring-1 ring-gray-500'>{data.title}</h1>

      {/* Main Component */}
      <div className='
        max-w-screen-lg flex-1 w-full
        p-8 ring-1 ring-gray-500 min-h-full flex flex-col
      '>
        <BoardBoxTop auth={data.auth} />

        {/* Post List Component */}
        { data.posts &&
          <PostListBox
            posts={data.posts}
            getBoardWithPage={getBoardWithPage}
          /> }

      </div>
    </div>
  );
}

export default BoardViewPage;
