import React, {useCallback, useEffect} from 'react';
import {useHistory} from 'react-router';
import {useBoard, useBoardViewPath} from '@hooks/board';
import {ROOT_PATH} from '@constants';
import {
  BoardTitle,
} from '@components/boards/boardCommons';
import {
  PostListBox,
  SearchBox,
} from '@components/boards/BoardView';


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

  return (
    <div
      className=''
    >
      {/* Title */}
      <BoardTitle title={data?.title || ''} />

      {/* SearchBox */}
      <SearchBox />

      {/* PostList Box */}
      { loading || !data || !data.paginationObject ?

        <div className='mt-4'> loading... </div> :

        <PostListBox
          paginationObject={data.paginationObject}
          getBoardWithPage={getBoardWithPage}
        />
      }

    </div>
  );
}

export default BoardViewPage;
