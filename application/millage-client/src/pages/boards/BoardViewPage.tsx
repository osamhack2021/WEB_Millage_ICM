import React, {useCallback, useEffect} from 'react';
import {useHistory} from 'react-router';
import {useBoard, useBoardViewPath} from '@hooks/board';
import {ROOT_PATH} from '@constants';
import {
  PostListBox,
  BoardBoxTop,
  BoardTitle,
} from '@components/boards';


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

  console.log(data);

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
      <BoardTitle title={data.title} />

      {/* Main Component */}
      <div className='
        max-w-screen-lg flex-1 w-full
        p-8 ring-1 ring-gray-500 min-h-full flex flex-col
      '>
        <BoardBoxTop auth={data.auth} />

        {/* Post List Component */}
        { data.paginationObject &&
          <PostListBox
            paginationObject={data.paginationObject}
            getBoardWithPage={getBoardWithPage}
          />}

      </div>
    </div>
  );
}

export default BoardViewPage;
