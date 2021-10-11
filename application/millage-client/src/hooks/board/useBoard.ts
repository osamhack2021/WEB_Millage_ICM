import {RootState} from '@modules';
import {
  getBoardByIdAsync,
  getBoardListAsync,
  getPostAsync,
  togglePostHeartAsync,
} from '@modules/board/actions';
import {
  GetBoardByIdReq,
  GetBoardListInput,
  GetPostReq,
  TogglePostHeartReq,
} from '@modules/board/types';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function useBoard() {
  const boardListState = useSelector(
      (state: RootState) => state.Board.boardListState,
  );
  const curBoardState = useSelector(
      (state: RootState) => state.Board.curBoardState,
  );
  const postState = useSelector(
      (state: RootState) => state.Board.postState,
  );

  const dispatch = useDispatch();
  const getBoardList = useCallback((
      getBoardListInput?: GetBoardListInput,
  ) => {
    dispatch(getBoardListAsync.request(getBoardListInput || {}));
  }, [dispatch]);
  const getBoardById = useCallback(
      (getBoardByIdReq: GetBoardByIdReq) => {
        dispatch(getBoardByIdAsync.request(getBoardByIdReq));
      }, [dispatch]);
  const getPost = useCallback((getPostReq: GetPostReq) => {
    dispatch(getPostAsync.request(getPostReq));
  }, [dispatch]);
  const togglePostHeart = useCallback(
      (togglePostHeartReq: TogglePostHeartReq) => {
        dispatch(togglePostHeartAsync.request(togglePostHeartReq));
      }, []);

  return {
    curBoardState,
    boardListState,
    postState,
    getBoardList,
    getBoardById,
    getPost,
    togglePostHeart,
  };
}

export default useBoard;
