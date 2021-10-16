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

type Props = {
  userId: number;
  nickname: string;
  content: string;
  createdAt: Date;
  heartCount: number;
  liked: boolean;
  reply: boolean;
};

const CommentBox:React.FC<Props> = ({
  heartCount,
  userId,
  nickname,
  content,
  createdAt,
  liked,
  reply,
}) => {
  const dateObject = new Date(createdAt);
  const createdAtText =
    `${dateObject.getUTCFullYear()}`+
    `/${dateObject.getUTCMonth()+1}/${dateObject.getUTCDate()}`;

  const [replyOpen, setReplyOpen] = useState(false);


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
            <span>{nickname}</span>
          </div>
          <div>
            <button style={{
              marginRight: '-1px',
            }}
            onClick={()=>setReplyOpen(true)}
            ><img src={CommentIcon}/></button>
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
      <div className="CommentInputContainer w-full" style={!replyOpen?
      {
        display: 'none',
      }:{
        display: 'flex',
      }}>
        <input type="text"
          className="text"
          placeholder="댓글을 입력하세요."
        />
        <button><img src={ReplyButton}/></button>
      </div>
    </div>
  );
};

export default CommentBox;
