import {RootState} from '@modules';
import {
  getBoardByIdAsync,
  getBoardListAsync,
  getPostAsync,
  togglePostHeartAsync,
  toggleVoteAsync,
} from '@modules/board/actions';
import {
  GetBoardByIdReq,
  GetBoardListInput,
  GetPostReq,
  TogglePostHeartReq,
  ToggleVoteReq,
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
      }, [dispatch]);
  const toggleVote = useCallback(
      (toggleVoteReq: ToggleVoteReq) => {
        dispatch(toggleVoteAsync.request(toggleVoteReq));
      }, [dispatch]);
  // const toggleVote = useCallback(
  //   (toggleVoteReq: Omit<ToggleVoteReq, 'session'>) => {
  //     dispatch(toggleVoteAsync.request({...toggleVoteReq, session}));
  // }, [dispatch]);

  return {
    curBoardState,
    boardListState,
    postState,
    getBoardList,
    getBoardById,
    getPost,
    togglePostHeart,
    toggleVote,
  };
}

export default useBoard;
