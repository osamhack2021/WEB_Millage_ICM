import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import TodayIcon from '@mui/icons-material/Today';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import '../../Header/header.css';
import {XLayout} from '@components/common';
import {updateUnreadAsync, logoutAsync} from '@modules/User/actions';
import {setPageStateAction} from '@modules/Admin/actions';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const pageState = useSelector((state: any) => state.admin.page);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const goMain = () => {
    history.push('/');
  };

  const setPageState = (page: string) => {
    dispatch(setPageStateAction(page));
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goLogout = () => {
    dispatch(logoutAsync.request());
  };

  useEffect(()=> {
    setPageState('users');
  }, []);

  return (
    <header className="header">
      <XLayout className='h-full flex justify-between items-center'>
        <div className="logo" onClick={()=>goMain()}>
          <img src='img/logo.png'/>
          <div className="unitNameContainer">
            <div className="millage">
              ?????????
            </div>
            <div className="unitName">
              ???????????????
            </div>
          </div>
        </div>
        <div className="navigation">
          <RouterLink className={pageState == 'users' ? 'enabled' : ''}
            to='/' onClick={()=>setPageState('users')}>???????????????</RouterLink>
          <RouterLink className={pageState == 'units' ? 'enabled' : ''}
            to='/' onClick={()=>setPageState('units')}>
              ????????????
          </RouterLink>
          <RouterLink className={pageState == 'schedule' ? 'enabled' : ''}
            to='/' onClick={()=>setPageState('schedule')}>
              ?????????
          </RouterLink>
        </div>
        <div className="buttons">
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
            <MenuItem onClick={handleClose}>??? ??????</MenuItem>
            <MenuItem onClick={goLogout}>????????????</MenuItem>
          </Menu>
        </div>
      </XLayout>
      <div id="BottomNavigationContainer">
        <Paper sx={{position: 'fixed', width: '100%',
          bottom: 0, left: 0, right: 0}} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="???????????????" icon={<EventNoteOutlinedIcon />}
              className={pageState == 'users' ? 'enabled' : ''}
              onClick={()=> {
                setPageState('users');
              }}
            />
            {/* <BottomNavigationAction
              label="?????????" icon={<SendIcon />}
              className={pageState == 'dm' ? 'enabled' : ''}
              onClick={()=> {
                setPageState('dm');
                history.push('/dm');
              }}
            /> */}
            <BottomNavigationAction
              label="????????????" icon={<ListAltIcon />}
              className={pageState == 'units' ? 'enabled' : ''}
              onClick={()=> {
                setPageState('units');
              }}
            />
            <BottomNavigationAction
              label="?????????" icon={<TodayIcon />}
              className={pageState == 'schedule' ? 'enabled' : ''}
              onClick={()=> {
                setPageState('schedule');
              }}
            />
          </BottomNavigation>
        </Paper>
      </div>
    </header>
  );
}


export default Header;
