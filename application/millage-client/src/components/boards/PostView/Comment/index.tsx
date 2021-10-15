import {RootState} from '@modules';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Comment} from '@modules/board/types';
import './comment.css';

type Props = {
  userId: number;
  nickname: string;
  content: string;
  createdAt: Date;
  heartUserIds: number[];
  replies?: Comment[];
};

const CommentBox:React.FC<Props> = ({
  heartUserIds,
  userId,
  nickname,
  content,
  createdAt,
  replies,
}) => {
  return (
    <div id="CommentContainer" className="w-full mb-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <img className="smallericon" src="/img/dm/usericon.png" />
          <span>{nickname}</span>
        </div>
        <div>
          <button>대댓글</button>
          <button>공감</button>
          <button>쪽지</button>
          <button>신고</button>
        </div>
      </div>
      <div>
        <span>{content}</span>
      </div>
      <div>
        <span>{createdAt}좋아요 {heartUserIds}</span>
      </div>
    </div>
  );
};

export default CommentBox;
