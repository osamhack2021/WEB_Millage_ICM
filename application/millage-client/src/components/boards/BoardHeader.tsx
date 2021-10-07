import React, {useEffect} from 'react';
import {XLayout} from '@components/common';
import {useBoard} from '@hooks/board';
import {Link} from 'react-router-dom';
import {BOARD_PATH} from '@constants';

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
          <div>
            loading...
          </div> :

          <div className='max-w-5xl flex flex-wrap px-2 justify-center'>
            {data.map( (board) => (
              <Link
                to={`${BOARD_PATH}/${board.id}`}
                className='text-base text-gray-600 hover:underline mx-2'
              >
                {board.title}
              </Link>
            ))}
          </div>
        }
      </XLayout>
    </div>
  );
}

export default BoardHeader;
