import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import {Link as RouterLink, useHistory, useLocation} from 'react-router-dom';
import './header.css';
import {XLayout} from '@components/common';
import {updateUnreadAsync,
  logoutAsync,
  validateUserAsync,
  updateUserAsync} from '@modules/User/actions';
import {io, Socket} from 'socket.io-client';
import {RESERVATION_PATH, SOCKET_SERVER} from '@constants';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CssBaseline from '@mui/material/CssBaseline';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {SubmitHandler, useForm} from 'react-hook-form';
import {UserUpdateData, UserValidateData} from '@modules/User/types';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonOutlineOutlinedIcon from
  '@mui/icons-material/PersonOutlineOutlined';

import {
  BoardIcon,
  CalendarIcon,
  ManageIcon,
  ReservationIcon,
  GreenBoardIcon,
  GreenCalendarIcon,
  GreenManageIcon,
  GreenReservationIcon,

} from '@images';

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state: any) => state.user);
  const userValidate = useSelector((state: any) => state.user.validate);
  const newMessage = useSelector((state: any) => state.DM.newMessage);
  const [pageState, setPageState] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const {register, getValues, handleSubmit} = useForm<UserUpdateData>();
  let socket: Socket;
  const [connectedSocket, setSocket] = useState<Socket>();
  const [vNickName, setVNickName] = useState(0);
  const [vEmail, setVEmail] = useState(0);
  const [vPassword, setVPassword] = useState(0);
  const [newNickName, setNewNickName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [value, setValue] = useState(0);
  useEffect(()=>{
    if (userValidate === 'Duplicate Nickname') {
      setVNickName(1);
    } else if (userValidate=== 'Duplicate Email') {
      setVEmail(1);
    } else if (userValidate != '' && userValidate != 'undefined') {
      if (+userValidate == 0) {
        setVNickName(2);
      } else if (+userValidate == 5) {
        setVEmail(2);
      }
    }
  }, [userValidate]);

  useEffect(() => {
    setPageState(location.pathname.substr(1));
    console.log(pageState);
  }, []);

  useEffect(() => {
    if (newMessage && newMessage.message && newMessage.message != '') {
      if (connectedSocket) {
        const now = new Date();
        connectedSocket.emit('msgToServer', {
          message: newMessage.message,
          senderId: user.session.id,
          receiverId: newMessage.receiverId,
          anonymous: newMessage.anonymous,
          time: now.toLocaleString().slice(0, -3),
        });
      }
    }
  }, [newMessage]);

  const goMain = () => {
    setPageState('');
    history.push('/');
  };

  let AdminComponent;

  if (+user.session.role.id > 1) {
    AdminComponent = (
      <>
        <Grid item xs={12}>
          <label>?????????</label>
          <input className="buttonStyle disabled"
            id="unitName"
            name="unitName"
            autoComplete="unitName"
            value={user.session.unit.name}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <label>????????????(??????)</label>
          <input className="buttonStyle"
            {
              ...register('phonenumber')
            }
            id="phonenumber"
            placeholder="??????????????? ???????????????"
            name="phonenumber"
            autoComplete="phonenumber"
            value={newPhone}
            onChange={(e) => {
              setNewPhone(e.target.value);
            }}
          />
        </Grid>
      </>
    );
  }

  const validateInput = (data: UserValidateData) => {
    dispatch(validateUserAsync.request(data));
  };

  const checkPassword = (p : string|undefined, p2 : string) => {
    if (p != p2) {
      setVPassword(1);
    } else {
      setVPassword(0);
    }
  };


  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit: SubmitHandler<UserUpdateData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }
    const c = confirm('????????? ?????????????????????????');
    if (c) {
      if (vNickName == 1 || vEmail == 1 || vPassword == 1) {
        alert('?????? ?????? ??????????????????!');
      } else {
        dispatch(updateUserAsync.request({
          id: user.session.id,
          email: newEmail,
          nickname: newNickName,
          password: newPassword == undefined ||
            newPassword == '' ? undefined : newPassword,
          phonenumber: newPhone == undefined ||
            newPhone == '' ? undefined : newPhone,
        }));
      }
    }
  };

  useEffect(() => {
    if (user.result === 'updateUserSuccess') {
      alert('??????????????? ?????????????????????.');
    } else if (user.result === 'updateUserFail') {
      alert('????????? ?????????????????????.');
    }
  }, [user.result]);

  const editUser = () => {
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const goLogout = () => {
    dispatch(logoutAsync.request());
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setPageState('');
  };

  const goToDM = () => {
    setPageState('dm');
    history.push('/dm');
  };

  const adminHeaderLink = () => {
    if (user.session.role.name == 'ADMIN') {
      return (
        <RouterLink className={pageState == 'manage' ? 'enabled' : ''}
          to='/manage' onClick={()=>setPageState('manage')}>????????????</RouterLink>
      );
    }
  };

  const AdminManageLink = () => {
    if (user.session.role.name == 'ADMIN') {
      return (
        <BottomNavigationAction
          label="????????????" icon={
            <img src={pageState == 'manage' ?
            GreenManageIcon : ManageIcon}></img>
          }
          className={pageState == 'manage' ? 'enabled' : ''}
          onClick={()=> {
            setPageState('manage');
            history.push('/manage');
          }}
        />
      );
    }
  };

  useEffect(()=> {
    socket = io(SOCKET_SERVER, {transports: ['websocket'],
      withCredentials: true});
    socket.on('updateUnreadHeader', () => {
      dispatch(updateUnreadAsync.request());
    });
    setSocket(socket);
    setNewNickName(user.session.nickname);
    setNewEmail(user.session.email);
    setNewPhone(user.session.phonenumber);
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
              {user.session.unit.name}
            </div>
          </div>
        </div>
        <div className="navigation">
          <RouterLink className={pageState == '' ||
          pageState.substr(0, 5) == 'board' ? 'enabled' : ''}
          to='/' onClick={()=>setPageState('')}>?????????</RouterLink>
          <RouterLink className={pageState == 'schedule' ? 'enabled' : ''}
            to='/schedule' onClick={()=>setPageState('schedule')}>
              ?????????
          </RouterLink>
          <RouterLink className={pageState == 'reservation' ||
          pageState.substr(0, 5) == 'reser' ? 'enabled' : ''}
          to={RESERVATION_PATH} onClick={()=>setPageState('reservation')}>
              ????????????
          </RouterLink>
          {adminHeaderLink()}
        </div>
        <div className="buttons">
          <IconButton className={pageState == 'dm' ? 'enabled2' : ''}
            onClick={goToDM}>
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
            <MenuItem onClick={editUser}>??? ??????</MenuItem>
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
              label="?????????" icon={
                <img src={pageState == '' ||
                pageState.substr(0, 5) == 'board' ?
                GreenBoardIcon : BoardIcon} />}
              className={pageState == '' ||
              pageState.substr(0, 5) == 'board' ? 'enabled' : ''}
              onClick={()=> {
                setPageState('');
                history.push('/');
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
              label="?????????" icon={
                <img src={pageState == 'schedule' ?
                GreenCalendarIcon :CalendarIcon} />}
              className={pageState == 'schedule' ? 'enabled' : ''}
              onClick={()=> {
                setPageState('schedule');
                history.push('/schedule');
              }}
            />
            <BottomNavigationAction
              label="????????????" icon={
                <img src={pageState == 'reservation' ||
                pageState.substr(0, 5) == 'reser' ?
                GreenReservationIcon :ReservationIcon} />
              }
              className={pageState == 'reservation' ||
              pageState.substr(0, 5) == 'reser' ? 'enabled' : ''}
              onClick={()=> {
                setPageState('reservation');
                history.push(RESERVATION_PATH);
              }}
            />
            {AdminManageLink()}
          </BottomNavigation>
        </Paper>
      </div>
      <Dialog id="UserDialog" onClose={closeDialog} open={openDialog}>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          ????????? ?????? ??????
        </DialogTitle>
        <DialogContent>
          <Container className="container" component="main">
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" noValidate className="box"
                onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <label>??????</label>
                    <input className="buttonStyle"
                      value={user.session.fullname}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>?????????</label>
                    <input className="buttonStyle"
                      {...register('nickname')}
                      id="nickname"
                      placeholder="??????????????? ????????? ???????????? ???????????????."
                      name="nickname"
                      value={newNickName}
                      onChange={(e) => {
                        setNewNickName(e.target.value);
                      }}
                      onBlur={() => {
                        if (newNickName != user.session.nickname) {
                          validateInput({nickname: newNickName});
                        }
                      }
                      }
                    />
                    <label className=
                      {vNickName == 1 ? 'warning' : 'hidden'}>
                        ?????? ???????????? ??????????????????.</label>
                    <label className=
                      {vNickName == 2 ? 'approve' : 'hidden'}>
                        ?????? ????????? ??????????????????.</label>
                  </Grid>
                  <Grid item xs={12}>
                    <label>?????????</label>
                    <input className="buttonStyle"
                      id="username"
                      name="username"
                      autoComplete="username"
                      value={user.session.username}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>????????????</label>
                    <input className="buttonStyle"
                      {...register('password')}
                      name="password"
                      placeholder="????????? ??????????????? ???????????????."
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>???????????? ??????</label>
                    <input className="buttonStyle"
                      name="password_check"
                      placeholder="????????? ??????????????? ?????? ??? ???????????????."
                      type="password"
                      id="password_check"
                      onChange={(e) => {
                        if (newPassword && e.target.value) {
                          checkPassword(newPassword, e.target.value);
                        }
                      }}
                    />
                    <label className=
                      {vPassword == 0 ? 'hidden' : 'warning'}>
                        ??????????????? ???????????? ????????????</label>
                  </Grid>
                  <Grid item xs={12}>
                    <label>?????????</label>
                    <input className="buttonStyle"
                      {...register('email', {required: 'Email is Required'})}
                      id="email"
                      placeholder="???????????? ???????????????."
                      name="email"
                      autoComplete="email"
                      value={newEmail}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                      onBlur={() => {
                        if (newEmail != user.session.email) {
                          validateInput({email: newEmail});
                        }
                      }
                      }
                    />
                    <label className=
                      {vEmail == 1 ? 'warning' : 'hidden'}>
                        ?????? ????????? ??????????????????.</label>
                    <label className=
                      {vEmail == 2 ? 'approve' : 'hidden'}>
                        ?????? ????????? ??????????????????.</label>
                  </Grid>
                  {AdminComponent}
                </Grid>
                <Button
                  className="submitButton"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}
                >
                  ????????????
                </Button>
              </Box>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </header>
  );
}


export default Header;
