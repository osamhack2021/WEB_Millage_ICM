import React from 'react';
import Login from '@components/Login';
import Button from '@mui/material/Button';
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
            <Button id="searchUnit" 
              variant="outlined" endIcon="img/searchicon.png">
              찾으시는 부대를 검색하세요
            </Button>
          </div>
        </div>
        <div className = "list">

        </div>
      </section>
    </div>
  );
}


export default Intro;
