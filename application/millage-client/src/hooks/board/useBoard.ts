import {RootState} from '@modules';
import {
  createPostAsync,
  getBoardByIdAsync,
  getBoardListAsync,
  getPostAsync,
  togglePostHeartAsync,
  toggleRecruitAsync,
  toggleVoteAsync,
} from '@modules/board/actions';
import {
  CreatePostReq,
  GetBoardByIdReq,
  GetBoardListInput,
  GetPostReq,
  TogglePostHeartReq,
  ToggleRecruitReq,
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
  const createPostState = useSelector(
      (state: RootState) => state.Board.createPostState,
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
  const createPost = useCallback((createPostReq: CreatePostReq) => {
    dispatch(createPostAsync.request(createPostReq));
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
  const toggleRecruit = useCallback(
      (toggleRecruitReq: ToggleRecruitReq) => {
        dispatch(toggleRecruitAsync.request(toggleRecruitReq));
      }, [dispatch]);

  return {
    curBoardState,
    boardListState,
    postState,
    createPostState,
    getBoardList,
    getBoardById,
    getPost,
    createPost,
    togglePostHeart,
    toggleVote,
    toggleRecruit,
  };
}

export default useBoard;
