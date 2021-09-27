import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import './login.css';

function Login() {
  return (
    <div className="login">
      <RouterLink className="logo" to='/'>
        <img src='img/logo.png'/>
      </RouterLink>
      <RouterLink className="loginButton" to='/login'>로그인</RouterLink>
      <RouterLink className="registerButton" to='/register'>회원가입</RouterLink>
    </div>
  );
}


export default Login;
