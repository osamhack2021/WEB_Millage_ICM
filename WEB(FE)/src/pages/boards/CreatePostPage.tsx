import React, {useEffect, useState} from 'react';
import {useBoard} from '@hooks/board';
import {NORMAL, POLL, POST_PATH, RECRUIT} from '@constants';
import {CreatePostReq, PollInputs, PostType} from '@modules/board/types';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  CreatePollBox,
  SelectBoardBox,
  SelectPostTypeBox,
  PostTitleBox,
  ContentBox,
  RecruitInputBox,
} from '@components/boards/CreatePost';
import {useHistory} from 'react-router';
import {FilledButton} from '@components/common';


function CreatePostPage() {
  const {
    curBoardState,
    boardListState,
    createPostState,
    getBoardList,
    createPost,
    toggleRecruit,
    initCreatePostState,
  } = useBoard();

  useEffect(() => {
    getBoardList();
  }, []);

  const {data: curBoard} = curBoardState;
  const {data: boardList} = boardListState;

  const [
    selectedBoardId,
    setBoardID,
  ] = useState<number>(curBoard?.id || 0);
  const selectedBoard = boardList?.find((b) => b.id === selectedBoardId);

  const [postType, setPostType] = useState<PostType>(NORMAL);

  // submit 전에 content가 ''인 poll 제거하는 로직 필요
  const [pollList, setPollList] = useState<PollInputs[]>([{
    index: 1,
    content: '',
  }]);

  const {register, handleSubmit} = useForm<CreatePostReq>({
    defaultValues: {totalMember: 1},
  });
  const onSubmit: SubmitHandler<CreatePostReq> = (data) => {
    if (createPostState.loading) {
      return;
    }
    if (!selectedBoard) {
      window.alert('게시판을 선택해주세요.');
      return;
    }
    if (!selectedBoard.pollAllowed && postType === POLL) {
      window.alert('게시글 타입을 선택해주세요.');
      return;
    }
    if (!selectedBoard.recruitAllowed && postType === RECRUIT) {
      window.alert('게시글 타입을 선택해주세요.');
      return;
    }

    const createPostReq: CreatePostReq = {
      boardId: selectedBoardId,
      postType,
      title: data.title,
      content: data.content,
    };
    if (postType === POLL) {
      createPostReq.pollList = pollList
          .filter((p) => p.content !== '')
          .map((p) => p.content);
    } else if (postType === RECRUIT) {
      if (!data.totalMember || data.totalMember < 1) {
        window.alert('모집 인원은 1명 이상이어야 합니다.');
        return;
      }
      createPostReq.totalMember = data.totalMember;
    }

    createPost(createPostReq);
  };


  /**
   * 게시글 생성이 완료되었을 때,
   * 1) 모집 게시글인 경우, 자동으로 참가
   * 2) 해당 게시글 페이지로 이동
   * 3) CreatePostState를 초기화
   */
  const history = useHistory();
  if (createPostState.data) {
    const {id, postType} = createPostState.data;
    if (postType === RECRUIT) {
      toggleRecruit({postId: id});
    }
    history.push(`${POST_PATH}/${createPostState.data.id}`);
  }
  useEffect(() => {
    return () => {
      initCreatePostState();
    };
  }, []);


  return (
    <div
      className='flex flex-col items-center ring-1 ring-gray-300 py-8 px-6'
    >
      <h1 className='text-2xl' > 게시글 작성하기 </h1>

      {/* 게시판 선택 */}
      <SelectBoardBox
        selectedBoardId={selectedBoardId}
        setBoardId={setBoardID}
      />

      {/* 게시글 타입 선택 */}
      { selectedBoard &&
        (selectedBoard.pollAllowed || selectedBoard.recruitAllowed) &&
        <SelectPostTypeBox
          postType={postType}
          setPostType={setPostType}
          selectedBoard={selectedBoard}
        />
      }

      <form
        className='flex flex-col w-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 게시글 제목 */}
        <PostTitleBox register={register} />

        {/* 게시글 내용 */}
        <ContentBox register={register} />

        {/* <h3 className='text-xl mt-4 mb-2' >이미지 업로드</h3> */}
        {/* react-dropzone 사용하기 */}

        {/* 설문 기능 */}
        { selectedBoard?.pollAllowed && postType === POLL &&
          <CreatePollBox
            pollList={pollList}
            setPollList={setPollList}
          />
        }

        {/* 모집 기능 */}
        { selectedBoard?.recruitAllowed && postType === RECRUIT &&
          <RecruitInputBox register={register} />
        }

        <FilledButton className='w-72 mt-8 text-lg' >
          {createPostState.loading ?
            'loading...' :
            '게시글 생성하기'}
        </FilledButton>
      </form>

    </div>
  );
}

export default CreatePostPage;
