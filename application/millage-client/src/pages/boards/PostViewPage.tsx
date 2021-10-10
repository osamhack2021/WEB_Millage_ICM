import React, {useEffect} from 'react';
import {useBoard} from '@hooks/board';
import {useParams} from 'react-router';
import {BoardTitle} from '@components/boards';

type Params = {
  postId: string;
}

function PostViewPage() {
  const {postState, getPost, curBoardState} = useBoard();
  const {postId} = useParams<Params>();
  const {loading, data} = postState;

  useEffect(() => {
    getPost({postId: +postId});
  }, []);

  console.log(curBoardState);
  console.log(data);
  /**
   * title, content, createdAt, id, images, pollItems, postType,
   */

  return (
    <div>
      <BoardTitle title={curBoardState.data?.title || ''} />

      {!loading && data ?

      <div className='ring-1 ring-gray-300 p-3 flex flex-col'>

        <div className='h-16 w-full bg-red-300'>
          PostHeader (
            아이콘: {data.postType},
            작성자: {data.writer.nickname},
            작성시각: {data.createdAt},
            쪽지 등등
          )
        </div>

        <h1 className='text-2xl' > {data.title} </h1>
        <p> {data.content} </p>

        { data.postType === 'POLL' && data.pollItems &&
          <div className='flex flex-col'>
            {data.pollItems.map( (poll) => (
              <div className='ring-1 ring-gray-300 p-2 cursor-pointer' >
                {poll.content}
              </div>
            ))}
          </div>
        }

        { data.postType === 'RECRUIT' &&
          <div>
            ExtraBox (모집)
          </div>
        }

        <div>
          PostBottom (좋아요, 댓글수, 좋아요 / 취소 기능)
        </div>

        <div>
          댓글 컴포넌트
        </div>

      </div> :

      <div>
        loading...
      </div>}
    </div>
  );
}

export default PostViewPage;
