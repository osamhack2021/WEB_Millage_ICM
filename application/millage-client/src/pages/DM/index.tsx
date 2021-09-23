import React from 'react';
import MessageBoxes from './MessageBoxes';
import Messages from './Messages';
import connect from 'socket.io-client';
import './DM.css';

// codespace에서 사용하기 떄문에 임시로 서버를 codespace용 url로 바꿈
const socket = connect('https://pec9399-osamhack2021-web-millage-icm-9w47x6q9h7j99-3000.githubpreview.dev');

(() => {
  socket.emit('events', {name: 'Nest'}, (data: any) => console.log(data));
})();

function DM() {
  return (
    <div id="container">
      <MessageBoxes/>
      <Messages/>
    </div>
  );
}

export default DM;
