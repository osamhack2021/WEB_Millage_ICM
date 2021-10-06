import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {Link as RouterLink, useHistory} from 'react-router-dom';
import './header.css';

function Header() {
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const [pageState, setPageState] = useState('board');
  const [anchorEl, setAnchorEl] = useState(null);
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

  return (
    <header className="header">
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
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
}


export default Header;
