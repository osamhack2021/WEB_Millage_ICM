import React from 'react';
import Login from '@components/Login';
import './intro.css';
import UnitList from '@components/UnitList';

function Intro() {
  return (
    <div id="introContainer">
      <section className="left">
        <div className="wrap">
          <img src='img/introtext.png'/>
        </div>
        <div className="wrap2">
          <img src='img/introduce.png'/>
          <img src='img/symbol.png'/>
        </div>
      </section>
      <section className="rightbar">
        <Login />
        <UnitList />
      </section>
    </div>
  );
}


export default Intro;
