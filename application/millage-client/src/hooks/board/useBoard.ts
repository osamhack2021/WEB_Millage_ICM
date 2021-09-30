import {RootState} from '@modules';
import {getBoardByIdAsync, getBoardListAsync} from '@modules/board/actions';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function useBoard() {
  const boardList = useSelector( (state: RootState) => state.Board.boardList );
  const curBoard = useSelector( (state: RootState) => state.Board.curBoard );

  const dispatch = useDispatch();
  const getBoardList = useCallback(() => {
    dispatch(getBoardListAsync.request());
  }, [dispatch]);
  const getBoardById = useCallback((boardId: number) => {
    dispatch(getBoardByIdAsync.request({boardId}));
  }, [dispatch]);

  return {
    curBoard,
    boardList,
    getBoardList,
    getBoardById,
  };
}

export default useBoard;
