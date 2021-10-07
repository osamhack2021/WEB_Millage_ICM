import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {SOCKET_SERVER} from '@constants';
import './DM.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {getMessageBoxListAsync, getMessagesAsync} from '@modules/DM/actions';

interface MessageInterface {
  message: string;
}

export interface MessageData{
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
  const {register, handleSubmit} = useForm<MessageInterface>();
  const [socket] = useState(io(SOCKET_SERVER, {transports: ['websocket']}));
  const [receiverId, setReceiverId] = useState(-1);
  const getMessage = (id: number) => {
    dispatch(getMessagesAsync.request(id));
    setReceiverId(id);
  };

  socket.on('msgToClient', (data:MessageData) => {
    console.log(data);
  });

  const getMessage = (id: number) => {
    console.log(id);
    dispatch(getMessagesAsync.request(id));
  };

  useEffect(() => {
    dispatch(getMessageBoxListAsync.request());
    socket.emit('subscribe',
        {id: session.id}, (data: any) => console.log(data));
  }, [dispatch]);

  useEffect(() => {
    // console.log(messages);
  }, [messages]);

  const renderMessageBoxes = () => {
    return messageboxes.map((mb: any) => {
      return (
        <div>
          <button onClick={()=>getMessage(mb.senderId)}
            key={mb.id}>{mb.message}
          </button>
        </div>
      );
    });
  };

  const renderMessages = () => {
    return messages.map((m: any) => {
      return (
        <div key={m.id}>
          {m.message}
        </div>
      );
    });
  };

  const onSubmit: SubmitHandler<MessageData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }
    socket.emit('msgToServer', {
      message: data.message,
      senderId: session.id,
      receiverId: receiverId,
      anonymous: false,
    });
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
        <div className="title"></div>
        <div className="items"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderMessages()}
          <input type="text" placeholder="메시지 입력"
            {...register('message', {})}
          />
        </form>
      </div>
    </div>
  );
}

export default DM;
