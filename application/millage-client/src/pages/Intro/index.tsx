import React from 'react';
import Login from '@components/Login';
import './intro.css';
import UnitList from '@components/UnitList';
import {RouteComponentProps} from 'react-router-dom';

function Intro(props: RouteComponentProps) {
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
        <UnitList {...props}/>
      </section>
    </div>
  );
}


export default Intro;
