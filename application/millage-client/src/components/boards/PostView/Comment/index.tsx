import {RootState} from '@modules';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Comment} from '@modules/board/types';
import './comment.css';
import {
  UserIcon,
  Like,
  CommentIcon,
  ReportIcon,
  ReplyIcon,
  ReplyButton,
} from '@images';
import {insertReplyAsync} from '@modules/board/actions';
import {useBoard} from '@hooks/board';

type Props = {
  postId: number;
  nickname: string;
  content: string;
  createdAt: Date;
  heartCount: number;
  liked: boolean;
  reply: boolean;
  parentCommentId?: number;
};

const CommentBox:React.FC<Props> = ({
  heartCount,
  postId,
  nickname,
  content,
  createdAt,
  liked,
  reply,
  parentCommentId,
}) => {
  const dispatch = useDispatch();
  const dateObject = new Date(createdAt);
  const createdAtText =
    `${dateObject.getUTCFullYear()}`+
    `/${dateObject.getUTCMonth()+1}/${dateObject.getUTCDate()}`;

  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const {replyState} = useBoard();

  useEffect(() => {
    if (replyState.result == 'success') {
      setReplyText('');
      setReplyOpen(false);
    }
  }, [replyState]);

  const addReply = () => {
    dispatch(insertReplyAsync.request({
      content: replyText,
      parentCommentId: parentCommentId,
      postId: postId,
    }));
  };

  return (
    <div>
      <div className="CommentContainer w=full">
        <div className="flex flex-row justify-between">
          <div className="name flex flex-row">
            {
              reply?
              <img style={{
                marginRight: '10px',
              }} src={ReplyIcon} />:
              ''
            }
            <img className="smallericon" src={UserIcon} />
            <span style={{
              marginLeft: '10px',
            }}>{nickname}</span>
          </div>
          <div>
            <button style={{
              marginRight: '-1px',
            }}
            onClick={()=>setReplyOpen(true)}
            ><img className={reply?'hidden':''}
                src={CommentIcon}/></button>
            <button><img src={ReportIcon}/></button>
          </div>
        </div>
        <div className="content" style={
          reply?{
            marginLeft: '45px',
          }:{}}>
          <span>{content}</span>
        </div>
        <div className="footer flex items-center"
          style={
          reply?{
            marginLeft: '45px',
          }:{}}>
          <span>{createdAtText}</span>
          <span className="heart flex items-center">
            <div
              className='h-4 w-4 mr-1 bg-cover'
              style={{backgroundImage: `url(${Like})`}}
            />
            {heartCount}</span>
        </div>
      </div>
      <div className="CommentInputContainer w-full flex"
        style={!replyOpen? {
          display: 'none',
        }:{
          display: 'flex',
        }}
      >
        <input type="text"
          className="text"
          placeholder="댓글을 입력하세요."
          value={replyText}
          onChange={(e) => {
            setReplyText(e.target.value);
          }}
        />
        <button
          onClick={()=> addReply()}
        ><img src={ReplyButton}/></button>
      </div>
    </div>
  );
};

export default CommentBox;
