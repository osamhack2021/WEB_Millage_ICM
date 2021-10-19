import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import '../Header/header.css';
import {XLayout} from '@components/common';
import {io, Socket} from 'socket.io-client';
import {SOCKET_SERVER} from '@constants';
import {setPageStateAction} from '@modules/Admin/actions';

function LoginHeader() {
  const history = useHistory();
  const goMain = () => {
    history.push('/');
  };


  const goToDM = () => {
    history.push('/login');
  };

  return (
    <header className="header" style={
      {
        paddingTop: '30px',
        borderBottom: '1px solid rgba(0,0,0,0.15)',
      }
    }>
      <XLayout className='h-full flex justify-between items-center'>
        <div className="logo" onClick={() => goMain()}>
          <img src='/img/logo.png' />
          <div className="unitNameContainer">
            <div style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: '26px',
              letterSpacing: '-0.02em',
              color: '#10902C',
            }}>
              밀리지
            </div>
          </div>
        </div>
        <div>
          <RouterLink className="loginlink" to='/login'>로그인</RouterLink>
        </div>
      </XLayout>
    </header>
  );
}


export default LoginHeader;
