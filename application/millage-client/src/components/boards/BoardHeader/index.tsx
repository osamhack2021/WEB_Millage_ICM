import React, {useEffect} from 'react';
import {XLayout} from '@components/common';
import {useBoard} from '@hooks/board';
import BoardHeaderLoading from './Loading';
import BoardLink from './BoardLink';

function BoardHeader() {
  const {getBoardList, boardListState} = useBoard();
  const {loading, data} = boardListState;

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <div className='bg-gray-300 py-4 flex justify-center items-center'>
      <XLayout>
        { loading || !data ?

          <BoardHeaderLoading /> :

          <div className='max-w-5xl flex flex-wrap px-2 justify-center'>
            {data.map( (board) => (
              <BoardLink
                id={board.id}
                title={board.title}
                key={board.id}
              />
            ))}
          </div>
        }
      </XLayout>
    </div>
  );
}

export default BoardHeader;
