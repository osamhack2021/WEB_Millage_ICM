import React from 'react';
import {ADMIN_UNITSELECT_PATH, UNITSELECT_PATH} from '@constants';
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
      pathname: ADMIN_UNITSELECT_PATH,
      state: {
        roleId: 2,
      },
    });
  };

  return (
    <div id="UserTypeContainer">
      <img className="headerImage" src='/img/SelectUserTypeLarge.png'/>
      <div className="links">
        <div className="imgButton" onClick={()=>moveUser()}>
          <img src='/img/UserTypeUserLarge.png'/>
        </div>
        <div className="imgButton" onClick={()=>moveAdmin()}>
          <img src='/img/UserTypeAdminLarge.png' />
        </div>
      </div>
      <div className="text">
        회원님께 해당하는 유형을 선택하여 주시기 바랍니다.
      </div>

    </div>
  );
};
