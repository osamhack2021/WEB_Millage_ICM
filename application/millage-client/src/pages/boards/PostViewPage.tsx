import React, {useEffect} from 'react';
import {useBoard} from '@hooks/board';
import {useParams} from 'react-router';
import {BoardTitle} from '@components/boards';
import {default as CommentBox} from '@components/boards/PostView/Comment';
import {Comment} from '@modules/board/types/';
import {PollListBox, RecruitBox, PostTopBox} from '@components/boards/PostView';

type Params = {
  postId: string;
}

function PostViewPage() {
  const {
    postState,
    getPost,
    curBoardState,
    togglePostHeart,
  } = useBoard();
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

  const renderComments = () => {
    return postState.data?.comments.map((comment : Comment) => {
      return (
        <CommentBox
          userId={comment.writer ? comment.writer.id : -1}
          content={comment.content}
          createdAt={comment.createdAt}
          heartUserIds={comment.heartUserIds}
          replies={comment.replies}
          nickname={comment.writer ? comment.writer.nickname : ''}
        />
      );
    });
  };

  return (
    <div>
      <BoardTitle title={curBoardState.data?.title || ''} />

      {!loading && data ?

      <div className='ring-1 ring-gray-300 p-3 flex flex-col'>

        <PostTopBox {...data} />

        <h1 className='text-2xl' > {data.title} </h1>
        <p> {data.content} </p>

        { data.postType === 'POLL' && data.pollItems &&
          <PollListBox
            pollItems={data.pollItems}
            isVoter={data.isVoter || false}
            postId={+postId}
          />
        }

        { data.postType === 'RECRUIT' && data.recruitStatus &&
          <RecruitBox {...data.recruitStatus } postId={data.id} />
        }

        <div>
          <button onClick={() => togglePostHeart({postId: +postId})}>
            { data.hasHearted ?
              '하트 취소' :
              '하트'
            }
          </button>
          PostBottom (좋아요, 댓글수, 좋아요 / 취소 기능)
        </div>

        <div>
          {renderComments()}
        </div>

      </div> :

      <div>
        loading...
      </div>}
    </div>
  );
}

export default PostViewPage;
