import React, {useEffect, useRef, useState} from 'react';
import './DM.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {getMessageBoxListAsync,
  getMessagesAsync,
  setMessagesAsRead} from '@modules/DM/actions';
import {MessageBox} from '@modules/DM/types';
import {updateUnreadAsync} from '@modules/User/actions';
import {io, Socket} from 'socket.io-client';
import {SOCKET_SERVER} from '@constants';

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
  const messages = useSelector((state: any) => state.DM.messages);
  const {register, handleSubmit, setValue} = useForm<MessageInterface>();
  let socket: Socket;
  const [connectedSocket, setSocket] = useState<Socket>();
  const receiverId = useRef(-1);
  const [receiverName, setReceiverName] = useState('');
  const [newMessages, setNewMessages] = useState<NewMessageInterface[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [localMessageBoxes, setLocalMessageBoxes]= useState<MessageBox[]>([]);
  const localMessageBoxRef = useRef<MessageBox[]>([]);
  const activeMessageBox = useRef(-1);
  const getMessage = (id: number, rId: number, name: string) => {
    receiverId.current = rId;
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

  useEffect(() => {
    dispatch(getMessageBoxListAsync.request());
    socket =  io(SOCKET_SERVER, {transports: ['websocket']});
    socket.on('msgToClient', (data:MessageData) => {
      const m = {
        time: data.time,
        message: data.message,
      };
      if (receiverId.current == -1 || data.senderId != receiverId.current) {
        dispatch(getMessageBoxListAsync.request());
      } else if (data.senderId == receiverId.current) {
        setNewMessages([...newMessages, m]);
        const clone = JSON.parse(JSON.stringify(localMessageBoxRef.current));
        clone[activeMessageBox.current].unread = 0;
        clone[activeMessageBox.current].message = data.message;
        setLocalMessageBoxes(clone);
        dispatch(setMessagesAsRead(receiverId.current));
      }
    });
    setSocket(socket);
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

  useEffect(() => {
    dispatch(updateUnreadAsync.request());
  }, [messages]);

  const renderMessageBoxes = () => {
    return localMessageBoxes.map((mb: any, idx: number) => {
      return (
        <div>
          <button className={receiverId.current == mb.senderId ? 'enabled' : ''}
            onClick={()=>getMessage(idx, mb.senderId, mb.senderName)}
            key={mb.id}>
            {mb.senderName} {mb.message} {mb.unread}
          </button>
        </div>
      );
    });
  };

  const renderMessages = () => {
    return messages.map((m: any) => {
      return (
        <div key={m.id}>
          {m.time} {m.message}
        </div>
      );
    });
  };

  const renderNewMessages = () => {
    return newMessages.map((m: any) => {
      return (
        <div key={m.time}>
          {m.time} {m.message}
        </div>
      );
    });
  };


  const onSubmit: SubmitHandler<MessageData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }
    let now = new Date().toLocaleString();
    now = now.substring(0, now.length - 2);
    if (connectedSocket) {
      connectedSocket.emit('msgToServer', {
        message: data.message,
        senderId: session.id,
        receiverId: receiverId.current,
        anonymous: anonymous,
        time: now,
      });
    } else {
      console.log('error');
    }

    const m = {
      time: now,
      message: data.message,
    };

    setNewMessages([...newMessages, m]);
    setValue('message', '');
  };

  return (
    <div id="MessageContainer">
      <div id="messageboxes">
        <div className="title">
          <h2>메시지 함</h2>
        </div>
        <div className="items">
          {renderMessageBoxes()}
        </div>
      </div>
      <div id="messages">
        <div className="title">
          {receiverName}
        </div>
        <div className="items"></div>
        <form onSubmit={handleSubmit(onSubmit)}
          className={receiverId.current != -1 ? '' : 'hide'}>
          {renderMessages()}
          {renderNewMessages()}
          <input
            type="text" placeholder="메시지 입력"
            {...register('message', {})} />
        </form>
      </div>
    </div>
  );
}

export default DM;
