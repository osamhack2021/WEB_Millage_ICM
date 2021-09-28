import React from 'react';
import Login from '@components/Login';
import './intro.css';

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
        <div className = "search">
          <div className="searchText">
            <img src='img/searchUnitText.png'/>
            <input id="searchUnit" type="text" placeholder="찾으시는 부대를 검색하세요"/>
          </div>
        </div>
        <div className = "list">

        </div>
      </section>
    </div>
  );
}


export default Intro;
