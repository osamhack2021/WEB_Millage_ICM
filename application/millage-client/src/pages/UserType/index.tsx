import React from 'react';
import {SIGNUP_PATH, UNITSELECT_PATH} from '@constants';
import {useHistory} from 'react-router-dom';
import './usertype.css';

export default function UserType() {
  const history = useHistory();

  const moveUser = () => {
    history.push({
      pathname: UNITSELECT_PATH,
      state: {
        roleId: 1,
      },
    });
  };

  const moveAdmin = () => {
    history.push({
      pathname: SIGNUP_PATH,
      state: {
        roleId: 2,
      },
    });
  };

  return (
    <div id="UserTypeContainer">
      <button onClick={()=>moveUser()}>일반 사용자</button>
      <button onClick={()=>moveAdmin()}>부대 관리자</button>
    </div>
  );
};
