import React, {useEffect} from 'react';
import MessageBoxes from './MessageBoxes';
import Messages from './Messages';
import {io} from 'socket.io-client';
import {SOCKET_SERVER} from '@constants';
import './DM.css';

function DM() {
  useEffect(() => {
    const socket = io(SOCKET_SERVER, {transports: ['websocket']});
    (() => {
      socket.emit('events', {name: 'Nest'}, (data: any) => console.log(data));
    })();
  }, []);

  return (
    <div id="container">
      <MessageBoxes/>
      <Messages/>
    </div>
  );
}

export default DM;
