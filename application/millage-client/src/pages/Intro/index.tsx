import React from 'react';
import Login from '@components/Login';
import './intro.css';
import UnitList from '@components/UnitList';
import LadingPageImage from '@images/intro/landingpageimg.png';
import {
  IntroIcon1,
  IntroIcon2,
  IntroIcon3,
} from '@images';
function Intro() {
  return (
    <div id="introContainer">
      <section className="left">
        <div className="wrap"
          style={{backgroundImage:
            `url(${LadingPageImage})`}}
        >
          <img src='img/introtext.png'
          />
        </div>
        <div className="wrap2">
          <img src='img/introduce.png'/>
          <div className="flex justify-center icons">
            <img src={IntroIcon1}/>
            <img src={IntroIcon2}/>
            <img src={IntroIcon3}/>
          </div>
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
