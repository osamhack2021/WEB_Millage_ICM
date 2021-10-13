import React, {useEffect, useRef, useState} from 'react';
import './DM.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {getMessageBoxListAsync,
  getMessagesAsync,
  setMessagesAsRead,
  deleteMessagesAsync} from '@modules/DM/actions';
import {MessageBox} from '@modules/DM/types';
import {updateUnreadAsync} from '@modules/User/actions';
import {io, Socket} from 'socket.io-client';
import {SOCKET_SERVER} from '@constants';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface MessageInterface {
  message: string;
}

interface NewMessageInterface{
  message: string;
  time: string;
}

interface MessageData{
  id: number;
  receiverId: number;
  senderId: number;
  senderName: string;
  message: string;
  time: string;
}

function DM() {
  const dispatch = useDispatch();
  const messageboxes = useSelector((state: any) => state.DM.messageboxes);
  const user = useSelector((state: any) => state.user);
  const session = user.session;
  const [sessionId, setSessionId] = useState(-1);
  const messages = useSelector((state: any) => state.DM.messages);
  const {register, handleSubmit, setValue} = useForm<MessageInterface>();
  let socket: Socket;
  const [connectedSocket, setSocket] = useState<Socket>();
  const receiverId = useRef(-1);
  const [lastReceived, setLastReceived] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [newMessages, setNewMessages] = useState<NewMessageInterface[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [localMessageBoxes, setLocalMessageBoxes]= useState<MessageBox[]>([]);
  const localMessageBoxRef = useRef<MessageBox[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const activeMessageBox = useRef(-1);
  const scrollbox = useRef<HTMLDivElement>(null);
  const getMessage = (id: number, rId: number, name: string, time:string) => {
    receiverId.current = rId;
    setLastReceived(time);
    setReceiverName(name);
    activeMessageBox.current = id;
    setNewMessages([]);
    if (name === '익명') {
      setAnonymous(true);
    } else {
      setAnonymous(false);
    }
    dispatch(getMessagesAsync.request(rId));

    const clone = JSON.parse(JSON.stringify(localMessageBoxes));
    clone[id].unread = 0;
    setLocalMessageBoxes(clone);
  };

  const deleteMessage = () => {
    const c = confirm(`정말로 ${receiverName}님과의 대화를 삭제하시겠습니까?`);
    if (c) {
      dispatch(deleteMessagesAsync.request(receiverId.current));
      receiverId.current = -1;
      setLastReceived('');
      setReceiverName('');
      activeMessageBox.current = -1;
      setNewMessages([]);
    }
  };

  const convert = (value:string) => {
    try {
      const today = new Date();
      let timeValue;
      if (value.slice(-1) == 'Z') {
        timeValue = new Date(value.slice(0, -1));
      } else {
        timeValue = new Date();
      }

      const betweenTime = Math.floor((today.getTime() -
        timeValue.getTime()) / 1000 / 60);
      if (betweenTime < 1) {
        return '방금전';
      }
      if (betweenTime < 60) {
        return `${betweenTime}분전`;
      }

      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
      }

      const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
      }

      return `${Math.floor(betweenTimeDay / 365)}년전`;
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getMessageBoxListAsync.request());
    socket = io(SOCKET_SERVER, {transports: ['websocket'],
      withCredentials: true});
    socket.on('updateUnread', () => {
      dispatch(updateUnreadAsync.request());
    });
    socket.on('msgToClient', (data:MessageData) => {
      const m = {
        time: data.time,
        message: data.message,
      };
      console.log(data);
      if (receiverId.current == -1 || data.senderId != receiverId.current) {
        dispatch(getMessageBoxListAsync.request());
      } else if (data.senderId == receiverId.current) {
        setLastReceived(data.time);
        setNewMessages([...newMessages, m]);
        const clone = JSON.parse(JSON.stringify(localMessageBoxRef.current));
        clone[activeMessageBox.current].unread = 0;
        clone[activeMessageBox.current].message = data.message;
        clone[activeMessageBox.current].time = data.time;
        setLocalMessageBoxes(clone);
        dispatch(setMessagesAsRead(receiverId.current));
      }
    });
    setSocket(socket);
    setSessionId(session.id);
  }, []);

  useEffect(() => {
    if (connectedSocket) {
      connectedSocket.emit('subscribe',
          {id: session.id}, (data: any) => console.log(data));
    }
  }, [connectedSocket]);

  useEffect(() => {
    setLocalMessageBoxes(messageboxes);
    localMessageBoxRef.current = messageboxes;
  }, [messageboxes]);

  const renderMessageBoxes = () => {
    if (scrollbox.current) {
      scrollbox.current.scrollTop = scrollbox.current.scrollHeight;
    }
    if (localMessageBoxes.length == 0) {
      return (
        <div className="nomessage" style={{paddingBottom: '140px'}}>
          <span>메시지 내역이 없습니다.</span>
        </div>
      );
    }
    return localMessageBoxes.map((mb: any, idx: number) => {
      return (
        <div key={idx}>
          <button className={receiverId.current == mb.senderId ? 'enabled' : ''}
            onClick={()=>getMessage(idx, mb.senderId, mb.senderName, mb.time)}>
            <Badge className="usericon" variant="dot"
              badgeContent={mb.unread == undefined ? 0 : mb.unread}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <img src="/img/dm/usericon.png" />
            </Badge>
            <div className="messageBoxDetail">
              <div style= {{
                fontWeight: 'bold',
              }}>{mb.senderName}</div>
              <div style = {{
                color: 'rgba(0, 0, 0, 0.5)',
              }}>
                {mb.message.length < 15 ?
                mb.message + ' ':
                mb.message.substr(0, 15) + '... '}
                {convert(mb.time)}
              </div>
            </div>
          </button>
        </div>
      );
    });
  };

  const renderMessages = () => {
    return messages.map((m: any) => {
      if (m.senderId == sessionId) {
        return (
          <div key={m.id} className="messageReverse">
            <div className="messageDetailContainer">
              <span className="mine">{m.message}</span>
            </div>
          </div>
        );
      } else {
        return (
          <div key={m.id} className="message">
            <div className="iconContainer ">
              <img className="smallerIcon" src="/img/dm/usericon.png" />
            </div>
            <div className="messageDetailContainer">
              <span className="others">{m.message}</span>
            </div>
          </div>
        );
      }
    });
  };

  const renderNewMessages = () => {
    return newMessages.map((m: any) => {
      if (m.senderId == sessionId) {
        return (
          <div key={m.id} className="messageReverse">
            <div className="messageDetailContainer">
              <span className="mine">{m.message}</span>
            </div>
          </div>
        );
      } else {
        return (
          <div key={m.id} className="message">
            <div className="iconContainer ">
              <img className="smallerIcon" src="/img/dm/usericon.png" />
            </div>
            <div className="messageDetailContainer">
              <span className="others">{m.message}</span>
            </div>
          </div>
        );
      }
    });
  };


  const onSubmit: SubmitHandler<MessageData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }
    const now = new Date();
    if (connectedSocket) {
      connectedSocket.emit('msgToServer', {
        message: data.message,
        senderId: session.id,
        receiverId: receiverId.current,
        anonymous: anonymous,
        time: now.toLocaleString().slice(0, -3),
      });
    } else {
      console.log('error');
    }

    const m = {
      time: now.toLocaleString().slice(0, -3),
      message: data.message,
      senderId: session.id,
    };

    setNewMessages([...newMessages, m]);
    setValue('message', '');
    const clone = JSON.parse(JSON.stringify(localMessageBoxRef.current));
    clone[activeMessageBox.current].unread = 0;
    clone[activeMessageBox.current].message = data.message;
    clone[activeMessageBox.current].time = now.toLocaleString();
    setLocalMessageBoxes(clone);
    setLastReceived(now.toLocaleString());
  };

  return (
    <div id="MessageContainer">
      <div id="messageboxes">
        <div className="title">
          <span>메시지함</span>
        </div>
        <div className="items">
          {renderMessageBoxes()}
        </div>
      </div>
      <div id="messages">
        <div className={receiverId.current == -1 ? 'hidden' : ''}>
          <div className="messageTitle">
            <div className="iconContainer">
              <img className="smallerIcon" src="/img/dm/usericon.png" />
            </div>
            <div className="messageBoxDetail" style={{
              paddingTop: '12.5px',
              width: '70px'}}>
              <div style= {{
                fontWeight: 'bold',
              }}>{receiverName}</div>
              <div style = {{
                color: 'rgba(0, 0, 0, 0.5)',
              }}>
                {convert(lastReceived)}
              </div>
            </div>
            <div className="deleteicon">
              <button style={{cursor: 'pointer', width: '36px'}}
                onClick={() => deleteMessage()}
              >
                <img style = {{
                  width: '36px',
                  height: '36px',
                }}
                src="/img/dm/deleteicon.png"/>
              </button>
            </div>
          </div>
          <div className="messagesContainer" ref={scrollbox}>
            {renderMessages()}
            {renderNewMessages()}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}
            className={receiverId.current != -1 ? '' : 'hide'}>
            <input
              type="text" placeholder="메시지 입력..."
              {...register('message', {})} />
          </form>
        </div>

        <div className={receiverId.current == -1 ? 'nomessage' : 'hidden'}>
          <span>좌측에서 메시지 목록 또는 메시지 작성 아이콘을 클릭하여 메시지를 작성하세요.</span>
        </div>
      </div>
      <Dialog id="DMUsersDialog" onClose={closeDialog} open={openDialog}>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          새로운 메시지
        </DialogTitle>
        <DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DM;
