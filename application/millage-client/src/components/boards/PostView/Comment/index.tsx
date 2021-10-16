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
  LikeComment,
  DMIcon,
  CommentDeleteIcon,
  LikeBlackFilled,
  LikeColorFilled,
} from '@images';
import {
  deleteReplyAsync,
  insertReplyAsync,
  likeReplyAsync} from '@modules/board/actions';
import {useBoard} from '@hooks/board';
import {NewMessage} from '@components/DM';

type Props = {
  postId: number;
  nickname: string;
  content: string;
  createdAt: Date;
  heartCount: number;
  liked: boolean;
  reply: boolean;
  parentCommentId?: number;
  userId: number;
  id: number;
};

const CommentBox:React.FC<Props> = ({
  heartCount,
  postId,
  nickname,
  content,
  createdAt,
  liked,
  reply,
  userId,
  parentCommentId,
  id,
}) => {
  const dispatch = useDispatch();
  const dateObject = new Date(createdAt);
  const createdAtText =
    `${dateObject.getUTCFullYear()}`+
    `/${dateObject.getUTCMonth()+1}/${dateObject.getUTCDate()}`;

  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [heart, setHeart] = useState(liked);
  const [heartCntLocal, setheartCntLocal] = useState(heartCount);
  const session = useSelector((state: RootState) => state.user.session);
  const closeDialog = () => {
    setOpenDialog(false);
  };
  const {replyState} = useBoard();

  useEffect(() => {
    if (replyState.result == 'insertReplySuccess') {
      setReplyText('');
      setReplyOpen(false);
    }
  }, [replyState.result]);
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
            className={reply || userId == -1 ?
              'hidden':''}
            onClick={()=>setReplyOpen(true)}
            ><img src={CommentIcon}/></button>
            <button className={userId == -1 ||
              userId == session?.id?'hidden':''}
            onClick={() => {
              setOpenDialog(true);
            }}><img src={DMIcon}/></button>
            <button
              className={
              userId != -1 &&
                userId != session?.id ?'':'hidden'}
              onClick={() => {
                dispatch(likeReplyAsync.request(id));
                setHeart(!heart);
                if (heart) {
                  setheartCntLocal(heartCntLocal - 1);
                } else {
                  setheartCntLocal(heartCntLocal + 1);
                }
              }}
            ><img src={heart ? LikeBlackFilled: LikeComment}/></button>
            <button className={
              userId == session?.id ||
              session?.role.name == 'ADMIN' ||
              session?.role.name =='SUPER_ADMIN'?'':'hidden'}
            onClick={() => {
              if (confirm('정말로 삭제하시겠습니까?')) {
                dispatch(deleteReplyAsync.request(id));
              }
            }}
            >
              <img src={CommentDeleteIcon}/>
            </button>
          </div>
        </div>
        <div className="content" style={
          reply?{
            marginLeft: '45px',
          }:{}}>
          <span>{content}</span>
        </div>
        {userId != -1 ?
        <div className="footer flex items-center"
          style={
          reply?{
            marginLeft: '45px',
          }:{}}>
          <span>{createdAtText}</span>
          <span className="heart flex items-center">
            <div
              className='h-4 w-4 mr-1 bg-cover'
              style={{backgroundImage: `url(${heart ? LikeColorFilled :Like})`}}
              onClick={() =>{
                dispatch(likeReplyAsync.request(id));
                setHeart(!heart);
                if (heart) {
                  setheartCntLocal(heartCntLocal - 1);
                } else {
                  setheartCntLocal(heartCntLocal + 1);
                }
              }}
            />
            {heartCntLocal}</span>
        </div> :
        ''
        }
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
      <NewMessage
        open={openDialog}
        closeHandler={closeDialog}
        receiverId={userId}
      />
    </div>
  );
};

export default CommentBox;
