import React, {useEffect} from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {UserLoginData} from '@modules/User/types';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {loginAsync} from '@modules/User/actions';
import './signin.css';
import 'typeface-roboto';
import 'typeface-inter';
import LoginLogo from '@images/login/loginlogo.svg';


export default function SignIn() {
  const history = useHistory();
  const {register, handleSubmit} = useForm<UserLoginData>();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const onSubmit: SubmitHandler<UserLoginData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }

    dispatch(loginAsync.request(data));
  };

  useEffect(()=>{
    if (user.result === 'success') {
      history.push('/');
    } else if (user.message) {
      alert(user.message);
    }
  }, [user]);


  return (
    <div id="SignInContainer">
      <div id="SignInWrap">
        <div className="logo">
          <img src={LoginLogo}/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className="block" placeholder="아이디"
            type="text"
            {...register('username', {required: 'Username is Required'})} />
          <input className="block" placeholder="비밀번호"
            type="password"
            {...register('password', {required: 'Password is Required'})} />
          <button className="loginButton block" type="submit">로그인</button>
        </form>
        <div className="block">
          <RouterLink className="right"
            to="/findpassword">아이디/비밀번호 찾기</RouterLink>
        </div>
        <div className="center block">
          <span className="lighter">밀리지에 처음이신가요?</span>
          <RouterLink
            className="registerLink" to = "/register">회원가입</RouterLink>
        </div>
      </div>
    </div>
  );
}
