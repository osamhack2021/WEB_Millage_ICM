import {RootState} from '@modules';
import {getBoardByIdAsync, getBoardListAsync} from '@modules/board/actions';
import {GetBoardByIdReq} from '@modules/board/types';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function useBoard() {
  const boardListState = useSelector(
      (state: RootState) => state.Board.boardListState,
  );
  const curBoardState = useSelector(
      (state: RootState) => state.Board.curBoardState,
  );

  const dispatch = useDispatch();
  const getBoardList = useCallback(() => {
    dispatch(getBoardListAsync.request());
  }, [dispatch]);
  const getBoardById = useCallback(
      (getBoardByIdReq: GetBoardByIdReq) => {
        dispatch(getBoardByIdAsync.request(getBoardByIdReq));
      }, [dispatch]);

  return {
    curBoardState,
    boardListState,
    getBoardList,
    getBoardById,
  };
}

export default useBoard;
