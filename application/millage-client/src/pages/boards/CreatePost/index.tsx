import React, {ChangeEvent, useEffect, useState} from 'react';
import {useBoard} from '@hooks/board';
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
} from '@mui/material';
import {NORMAL, POLL, RECRUIT} from '@constants';
import {PollInput} from '@modules/board/types';
import {CancelOutlined} from '@mui/icons-material';
import {SubmitHandler, useForm} from 'react-hook-form';

type PostType =
  | typeof NORMAL
  | typeof POLL
  | typeof RECRUIT

let newPollID = 1;

type PostInputs = {
  title: string;
  content: string;
  pollList?: PollInput[];
  rCount?: number;
}

function CreatePostPage() {
  const {curBoard, boardList, getBoardList} = useBoard();
  useEffect(() => {
    getBoardList();
  }, []);

  const [
    selectedBoardID,
    setSelectedBoardID,
  ] = useState<number>(curBoard?.id || 0);

  const selectedBoard = boardList.find((b) => b.id === selectedBoardID);

  const [postType, setPostType] = useState<PostType>(NORMAL);

  // submit 전에 content가 ''인 poll 제거하는 로직 필요
  const [pollList, setPollList] = useState<PollInput[]>([{
    createId: newPollID,
    content: '',
  }]);

  // Poll 입력 이벤트 헨들러
  const onPollInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Target Poll Update
    const targetPollIdx = pollList.findIndex((p) =>
      p.createId === +e.target.id);
    const updatedPollList: PollInput[] = [
      ...pollList.slice(0, targetPollIdx),
      {
        createId: +e.target.id,
        content: e.target.value,
      },
      ...pollList.slice(targetPollIdx + 1),
    ];

    // 마지막 Poll이면 새로운 Poll 생성
    const isLastInput = !(pollList.find((p) =>
      p.createId === (+e.target.id) + 1));
    if (isLastInput) {
      newPollID++;
      setPollList([
        ...updatedPollList,
        {
          content: '',
          createId: newPollID,
        },
      ]);
    } else {
      setPollList([...updatedPollList]);
    }
  };

  // Poll 삭제 이벤트 핸들러
  const onPollDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const inputId =
      e.currentTarget.parentElement?.parentElement?.lastElementChild?.id;
    if (!inputId || pollList.length === 1) {
      return;
    }
    const targetPollIdx = pollList.findIndex((p) => p.createId === +inputId);
    if (targetPollIdx === undefined) {
      return;
    }
    setPollList([
      ...pollList.slice(0, targetPollIdx),
      ...pollList.slice(targetPollIdx + 1),
    ]);
  };

  const {register, handleSubmit} = useForm<PostInputs>({
    defaultValues: {rCount: 0},
  });
  const onSubmit: SubmitHandler<PostInputs> = (data) => {
    if (!selectedBoard) {
      window.alert('게시판을 선택해주세요.');
      return;
    }
    if (!selectedBoard.allowPoll && postType === POLL) {
      window.alert('게시글 타입을 선택해주세요.');
      return;
    }
    if (!selectedBoard.allowRecruit && postType === RECRUIT) {
      window.alert('게시글 타입을 선택해주세요.');
      return;
    }

    const dataWillSend: PostInputs = {
      title: data.title,
      content: data.content,
    };
    if (postType === POLL) {
      dataWillSend.pollList = pollList.filter((p) => p.content !== '');
    } else if (postType === RECRUIT) {
      dataWillSend.rCount = data.rCount;
    }
    console.log(dataWillSend);
  };

  return (
    <div
      className='max-w-screen-xl py-4 px-4 mx-auto flex flex-col items-center
      lg:px-8 lg:py-8'
      style={{minHeight: '90vh'}}
    >
      <h1 className='text-2xl' > 게시글 생성하기 </h1>

      <div className='flex mt-6 w-9/12 justify-between' >
        <div className='flex' >
          <h3 className='text-xl mt-4 mb-2 mr-4' >게시판 선택</h3>
          <FormControl className='' style={{minWidth: '10rem'}}>
            <Select
              value={selectedBoardID}
              onChange={(e) => setSelectedBoardID((e.target.value as number))}
              renderValue={(selected) => {
                if (selected === 0) {
                  return <em>선택해주세요</em>;
                }

                return boardList.find((b) => b.id === selected)?.name;
              }}
            >
              {boardList.map( (b) =>
                <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>,
              )}
            </Select>
          </FormControl>
        </div>

        { (selectedBoard?.allowPoll || selectedBoard?.allowRecruit) &&
          <RadioGroup
            row
            value={postType}
            onChange={(e, v) => {
              if ( v !== NORMAL && v !== POLL && v !== RECRUIT ) return;
              setPostType(v);
            }}
          >
            <FormControlLabel
              value={NORMAL}
              control={<Radio />}
              label="일반 게시글"
            />
            { selectedBoard?.allowPoll &&
              <FormControlLabel
                value={POLL}
                control={<Radio />}
                label="설문 게시글"
              />
            }
            { selectedBoard?.allowRecruit &&
              <FormControlLabel
                value={RECRUIT}
                control={<Radio />}
                label="모집 게시글"
              />
            }
          </RadioGroup>
        }
      </div>

      <form
        className='mt-8 w-3/4 flex flex-col'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className='text-xl mt-4 mb-2' >게시글 제목</h3>
        <input
          {...register('title')}
          type='text'
          className='focus:outline-none border-b border-gray-500 py-2 w-full'
        />

        <h3 className='text-xl mt-4 mb-2' >내용</h3>
        <TextareaAutosize
          {...register('content')}
          placeholder="내용을 입력하세요."
          minRows={3}
          className='focus:outline-none border border-gray-500 resize-none p-4'
        />

        {/* <h3 className='text-xl mt-4 mb-2' >이미지 업로드</h3> */}
        {/* react-dropzone 사용하기 */}

        {/* 설문 기능 */}
        { selectedBoard?.allowPoll && postType === POLL &&
          <div className='w-full'>
            <h3 className='text-xl mt-4 mb-2' >설문지 만들기</h3>
            <div className='w-full'>
              { pollList.map((p) => (
                <div
                  key={p.createId}
                  className='relative ring-1 ring-gray-500'
                >
                  <div
                    className='
                      absolute right-4 top-0 bottom-0 flex items-center
                    '
                  >
                    <CancelOutlined
                      className='cursor-pointer text-red-400'
                      fontSize='small'
                      onClick={onPollDelete}
                    />
                  </div>
                  <input
                    id={p.createId.toString()}
                    value={p.content}
                    onChange={onPollInputChange}
                    className='w-full focus:outline-none p-4'
                    type='text'
                  />
                </div>
              ))}
            </div>
          </div>
        }

        { selectedBoard?.allowRecruit && postType === RECRUIT &&
          <div className='flex my-6 items-center' >
            <h3 className='text-xl mr-4' >모집 인원</h3>
            <input
              {...register('rCount')}
              className='p-2 ring-1 ring-gray-500 focus:outline-none'
              type='number'
              min={0}
            />
          </div>
        }

        <button
          className='
            bg-gray-500 text-white self-center
            px-40 py-5 mt-6 focus:outline-none
          '
        >
          게시글 생성
        </button>
      </form>


    </div>
  );
}

export default CreatePostPage;
