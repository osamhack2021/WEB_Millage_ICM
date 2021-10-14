import AdminUsers from '@components/Admin/AdminUsers';
import AdminBoards from '@components/Admin/AdminBoards';
import {setPageStateAction} from '@modules/Admin/actions';
import {useDispatch, useSelector} from 'react-redux';
import {XLayout} from '@components/common';
import './manage.css';
function Manage() {
  const dispatch = useDispatch();
  const adminState = useSelector((state: any) => state.admin);
  const setPageState = (page: string) => {
    dispatch(setPageStateAction(page));
  };

  return (
    <div id="ManageContainer">
      <XLayout className='navigation h-full flex justify-between items-center'>
        <a className={adminState.page == 'users' ? 'enabled' : ''}
          onClick={()=>setPageState('users')}>
            사용자관리
        </a>
        <a className={adminState.page == 'boards' ? 'enabled' : ''}
          onClick={()=>setPageState('boards')}>
            게시판관리
        </a>
        <a className={adminState.page == 'places' ? 'enabled' : ''}
          onClick={()=>setPageState('places')}>
            시설관리
        </a>
      </XLayout>
      <div id="AdminContainer">
        {adminState.page == 'users' ? <AdminUsers /> : ''}
        {adminState.page == 'boards' ? <AdminBoards /> : ''}
      </div>
    </div>
  );
}
export default Manage;
