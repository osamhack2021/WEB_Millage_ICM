import React, {useEffect, useRef, useState} from 'react';
import AdminUsers from '@components/Admin/AdminUsers';
import AdminUnits from '@components/Admin/AdminUnits';
import './admin.css';
import {useDispatch, useSelector} from 'react-redux';

export default function Admin() {
  const dispatch = useDispatch();
  const adminState = useSelector((state: any) => state.admin);

  return (
    <div id="AdminContainer">
      {adminState.page == 'users' ? <AdminUsers /> : ''}
      {adminState.page == 'units' ? <AdminUnits /> : ''}
    </div>
  );
}
