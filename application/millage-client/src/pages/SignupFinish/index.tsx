import React from 'react';
import {ROOT_PATH} from '@constants';
import {useHistory} from 'react-router-dom';
import './signupfinish.css';

export default function UserType() {
  const history = useHistory();
  const goMain = () =>{
    history.push(ROOT_PATH);
  };
  return (
    <div id="SignupFinishContainer">
      <img className="headerImage" src='/img/register/RegisterFinishLarge.png'/>
      <div className="text">
        회원가입 <span className="green">완료</span>
      </div>
      <div className="welcome">
        밀리지 회원가입을 환영합니다.
      </div>
      <button onClick={()=>goMain()}>시작하기</button>
    </div>
  );
};
