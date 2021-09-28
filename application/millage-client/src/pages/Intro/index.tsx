import React from 'react';
import Login from '@components/Login';
import './intro.css';

function Intro() {
  return (
    <div className="container">
      <aside className="rightbar">
        <Login />
      </aside>
      <section className="left">
        <div className="wrap">
        </div>
      </section>
    </div>
  );
}


export default Intro;
