import {RootState} from '@modules';
import {
  createBoardAsync,
  createPostAsync,
  getBoardByIdAsync,
  getBoardListAsync,
  getPostAsync,
  initCreatePostStateAction,
  initiateCreateBoardStateAction,
  insertReplyAsync,
  togglePostHeartAsync,
  toggleRecruitAsync,
  toggleVoteAsync,
} from '@modules/board/actions';
import {insertReplyApi} from '@modules/board/apis';
import {
  CreateBoardReq,
  CreatePostReq,
  GetBoardByIdReq,
  GetBoardListInput,
  GetPostReq,
  insertReplyReq,
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
  const createBoardState = useSelector(
      (state: RootState) => state.Board.createBoardState,
  );
  const postState = useSelector(
      (state: RootState) => state.Board.postState,
  );
  const createPostState = useSelector(
      (state: RootState) => state.Board.createPostState,
  );
  const replyState = useSelector(
      (state: RootState) => state.Board.replyState,
  );

  const sideboxState = useSelector(
      (state: RootState) => state.Board.sideboxState,
  );

  const starBoardState = useSelector(
      (state: RootState) => state.Board.starBoardState,
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
  const createBoard = useCallback((createBoardReq: CreateBoardReq) => {
    dispatch(createBoardAsync.request(createBoardReq));
  }, [dispatch]);
  const initCreateBoardState = useCallback(() => {
    dispatch(initiateCreateBoardStateAction());
  }, [dispatch]);
  const getPost = useCallback((getPostReq: GetPostReq) => {
    dispatch(getPostAsync.request(getPostReq));
  }, [dispatch]);
  const createPost = useCallback((createPostReq: CreatePostReq) => {
    dispatch(createPostAsync.request(createPostReq));
  }, [dispatch]);
  const initCreatePostState = useCallback(() => {
    dispatch(initCreatePostStateAction());
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

  const insertReply = useCallback(
      (data: insertReplyReq) => {
        dispatch(insertReplyAsync.request(data));
      }, [dispatch]);

  return {
    curBoardState,
    boardListState,
    createBoardState,
    postState,
    createPostState,
    replyState,
    sideboxState,
    starBoardState,
    getBoardList,
    getBoardById,
    createBoard,
    initCreateBoardState,
    getPost,
    createPost,
    initCreatePostState,
    togglePostHeart,
    toggleVote,
    toggleRecruit,
    insertReply,
  };
}

export default useBoard;
