import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import './header.css';
import {XLayout} from '@components/common';
import {updateUnreadAsync, logoutRequest} from '@modules/User/actions';
import {io, Socket} from 'socket.io-client';
import {SOCKET_SERVER} from '@constants';

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const [pageState, setPageState] = useState('board');
  const [anchorEl, setAnchorEl] = useState(null);
  let socket: Socket;
  const [connectedSocket, setSocket] = useState<Socket>();
  const goMain = () => {
    setPageState('board');
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
    socket = io(SOCKET_SERVER, {transports: ['websocket'],
      withCredentials: true});
    socket.on('updateUnreadHeader', () => {
      dispatch(updateUnreadAsync.request());
    });
    setSocket(socket);
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
              {user.session.unit.name}
            </div>
          </div>
        </div>
        <div className="navigation">
          <RouterLink className={pageState == 'board' ? 'enabled' : ''}
            to='/' onClick={()=>setPageState('board')}>게시판</RouterLink>
          <RouterLink className={pageState == 'schedule' ? 'enabled' : ''}
            to='/schedule' onClick={()=>setPageState('schedule')}>
              캘린더
          </RouterLink>
          <RouterLink className={pageState == 'reserve' ? 'enabled' : ''}
            to='/schedule' onClick={()=>setPageState('reserve')}>
              시설예약
          </RouterLink>
          <RouterLink className={pageState == 'globalboard' ? 'enabled' : ''}
            to='/' onClick={()=>setPageState('globalboard')}>전군게시판</RouterLink>
        </div>
        <div className="buttons">
          <IconButton onClick={goToDM}>
            <Badge badgeContent={user.unread} variant="dot">
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
