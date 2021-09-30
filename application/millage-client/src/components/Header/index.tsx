import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import {Link as RouterLink} from 'react-router-dom';
import './header.css';

function Header() {
  const user = useSelector((state: any) => state.user);
  const [pageState, setPageState] = useState('board');
  return (
    <header className="header">
      <div className="logo">
        <img src='img/logo.png'/>
        <div className="unitNameContainer">
          <div className="millage">
            밀리지
          </div>
          <div className="unitName">
            {user.session.unit.name}
          </div>
        </div>
      </div>
      <div className="navigation">
        <RouterLink className={pageState == 'board' ? 'enabled' : ''}
          to='/' onClick={()=>setPageState('board')}>게시판</RouterLink>
        <RouterLink className={pageState == 'schedule' ? 'enabled' : ''}
          to='/schedule' onClick={()=>setPageState('schedule')}>캘린더</RouterLink>
        <RouterLink className={pageState == 'reserve' ? 'enabled' : ''}
          to='/schedule' onClick={()=>setPageState('reserve')}>시설예약</RouterLink>
        <RouterLink className={pageState == 'globalboard' ? 'enabled' : ''}
          to='/' onClick={()=>setPageState('globalboard')}>전군게시판</RouterLink>
      </div>
      <div className="buttons">
        <IconButton component={RouterLink} to='/dm'>
          <SendIcon />
        </IconButton>
        <IconButton component={RouterLink} to='/user'>
          <PersonIcon />
        </IconButton>
      </div>
    </header>
  );
}


export default Header;
