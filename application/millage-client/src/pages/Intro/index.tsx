import React from 'react';
import Login from '@components/Login';
import './intro.css';

function Intro() {
  return (
    <div id="introContainer">
      <section className="left">
        <div className="wrap">
        </div>
      </section>
      <section className="rightbar">
        <Login />
      </section>
    </div>
  );
}


export default Intro;
