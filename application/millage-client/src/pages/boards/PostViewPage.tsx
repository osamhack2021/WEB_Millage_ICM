import React, {useEffect, useState} from 'react';
import {useBoard} from '@hooks/board';
import {useParams} from 'react-router';
import {BoardTitle} from '@components/boards/boardCommons';
import {default as CommentBox} from '@components/boards/PostView/Comment';
import {Comment} from '@modules/board/types/';
import {
  PollListBox,
  RecruitBox,
  PostTopBox,
  PostContentBox,
} from '@components/boards/PostView';
import {
  ReplyButton,
} from '@images';
type Params = {
  postId: string;
}

type customComment = Comment & {
  replies?: Comment[];
};

type commentData = {
  [key: number]: customComment;
};

function PostViewPage() {
  const {
    postState,
    getPost,
    curBoardState,
    togglePostHeart,
    insertReply,
    replyState,
  } = useBoard();
  const {postId} = useParams<Params>();
  const {loading, data} = postState;
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    getPost({postId: +postId});
  }, []);


  useEffect(() => {
    console.log(replyState.result);
    if (replyState.result == 'insertReplySuccess') {
      setReplyText('');
    } else if (replyState.result == 'deleteReplySuccess') {
      alert('댓글을 삭제하였습니다.');
    } else if (replyState.result == 'deleteReplyFail') {
      alert('댓글 삭제에 실패하였습니다.');
    }
  }, [replyState.result]);

  console.log(curBoardState);
  console.log(data);
  /**
   * title, content, createdAt, id, images, pollItems, postType,
   */

  const renderComments = () => {
    const commentMap : commentData = {};
    const parentComments = postState.data?.comments.filter((comment) => {
      return comment.parentCommentId == null;
    });

    parentComments?.forEach((comment : Comment) => {
      commentMap[comment.id] = comment;
      commentMap[comment.id].replies = [];
    });

    for (const key in commentMap) {
      if (commentMap.hasOwnProperty(key)) {
        commentMap[key].replies = postState.data?.comments.filter((comment) => {
          return comment.parentCommentId != null &&
            comment.parentCommentId == commentMap[key].id;
        });
      }
    }
    const finalComments = [];
    for (const key in commentMap) {
      if (commentMap.hasOwnProperty(key)) {
        finalComments.push(commentMap[key]);
        commentMap[key].replies?.forEach((comment: Comment) => {
          finalComments.push(comment);
        });
      }
    }
    return finalComments?.map((comment:Comment) => {
      return (
        <CommentBox
          key={comment.id}
          id={comment.id}
          postId={+postId}
          content={comment.content}
          createdAt={comment.createdAt}
          heartCount={comment.heartCount}
          liked={comment.liked}
          nickname={comment.writer ? comment.writer.nickname : ''}
          reply={comment.parentCommentId != null}
          parentCommentId={comment.id}
          userId={comment.isDeleted? -1 :
            (comment.writer ? comment.writer.id : -1)}
        />
      );
    });
  };

  return (
    <div>
      <BoardTitle title={curBoardState.data?.title || ''} />

      {!loading && data ?

      <div className='ring-1 ring-gray-300 p-6 flex flex-col'>

        {/* 상단부 (작성자, 작성시각, 하트, 댓글수, 타입 / 쪽지, 하트, 삭제) */}
        <PostTopBox {...data} />

        {/* 제목, 내용 */}
        <PostContentBox {...data} />

        {/* 설문 리스트 */}
        { data.postType === 'POLL' && data.pollItems &&
          <PollListBox
            pollItems={data.pollItems}
            isVoter={data.isVoter || false}
            postId={+postId}
          />
        }

        {/* 모집 상태 */}
        { data.postType === 'RECRUIT' && data.recruitStatus &&
          <RecruitBox {...data.recruitStatus } postId={data.id} />
        }

        {/* 댓글 컴포넌트 */}
        <div>
          <div className="CommentInputContainer w-full flex">
            <input type="text"
              className="text"
              placeholder="댓글을 입력하세요."
              value={replyText}
              onChange={(e) => {
                setReplyText(e.target.value);
              }}
            />
            <button
              onClick={()=> insertReply(
                  {
                    content: replyText,
                    postId: +postId,
                  },
              )}
            ><img src={ReplyButton}/></button>
          </div>
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
