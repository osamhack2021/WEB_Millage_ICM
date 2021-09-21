import React from 'react';
import MessageBoxes from './MessageBoxes';
import Messages from './Messages';
import './DM.css';

function DM() {
  return (
    <div id="container">
      <MessageBoxes/>
      <Messages/>
    </div>
  );
}

export default DM;
