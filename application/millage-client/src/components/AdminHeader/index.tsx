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
import {updateUnreadAsync, logoutRequest} from '@modules/User/actions';
import {io, Socket} from 'socket.io-client';
import {SOCKET_SERVER} from '@constants';

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const [pageState, setPageState] = useState('users');
  const [anchorEl, setAnchorEl] = useState(null);
  let socket: Socket;

  const goMain = () => {
    history.push('/');
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goLogout = () => {
    dispatch(logoutRequest());
    window.location.replace('/');
  };

  const goToDM = () => {
    setPageState('');
    history.push('/dm');
  };

  useEffect(()=> {
    dispatch(updateUnreadAsync.request());
  }, []);

  return (
    <header className="header">
      <XLayout className='h-full flex justify-between items-center'>
        <div className="logo" onClick={()=>goMain()}>
          <img src='img/logo.png'/>
          <div className="unitNameContainer">
            <div className="millage">
              밀리지
            </div>
            <div className="unitName">
              최고관리자
            </div>
          </div>
        </div>
        <div className="navigation">
          <RouterLink className={pageState == 'users' ? 'enabled' : ''}
            to='/' onClick={()=>setPageState('users')}>사용자관리</RouterLink>
          <RouterLink className={pageState == 'units' ? 'enabled' : ''}
            to='/' onClick={()=>setPageState('units')}>
              부대관리
          </RouterLink>
        </div>
        <div className="buttons">
          <IconButton onClick={goToDM}>
            <Badge badgeContent={user.unread} max={10} color="primary">
              <SendIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleClick}>
            <PersonIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={goLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </XLayout>
    </header>
  );
}


export default Header;
