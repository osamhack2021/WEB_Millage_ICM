import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {SOCKET_SERVER} from '@constants';
import './DM.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {getMessageBoxListAsync, getMessagesAsync} from '@modules/DM/actions';

interface MessageData {
  message: string;
}

function DM() {
  const dispatch = useDispatch();

  const messageboxes = useSelector((state: any) => state.DM.messageboxes);
  const messages = useSelector((state: any) => state.DM.messages);
  const {register, handleSubmit} = useForm<MessageData>();
  const [socket] = useState(io(SOCKET_SERVER, {transports: ['websocket']}));

  const getMessage = (id: number) => {
    console.log(id);
    dispatch(getMessagesAsync.request(id));
  };

  useEffect(() => {
    dispatch(getMessageBoxListAsync.request());
    socket.emit('events', {name: 'Nest'}, (data: any) => console.log(data));
  }, [dispatch]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const renderMessageBoxes = () => {
    return messageboxes.map((mb: any) => {
      return (
        <button onClick={()=>getMessage(mb.senderId)}
          key={mb.id}>{mb.message}
        </button>
      );
    });
  };

  const onSubmit: SubmitHandler<MessageData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }
    console.log(data);
  };

  return (
    <div id="container">
      <div id="messageboxes">
        <h2>메시지 함</h2>
        <div className="items">
          {renderMessageBoxes()}
        </div>
      </div>
      <div id="messages">
        <div className="title"></div>
        <div className="items"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="메시지 입력"
            {...register('message', {})}
          />
        </form>
      </div>
    </div>
  );
}

export default DM;
