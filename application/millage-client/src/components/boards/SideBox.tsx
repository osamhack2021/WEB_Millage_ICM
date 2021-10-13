import {CREATE_BOARD_PATH, CREATE_POST_PATH} from '@constants';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import './sidebox.css';

function SideBox() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const adminMenu = () => {
    return (
      <div className="box link">
        <div className="head">
          <RouterLink to={CREATE_BOARD_PATH} className="head">
            <img src="/img/board/boardicon.png"/>
            <span className = "title">게시판 생성하기</span>
          </RouterLink>
        </div>
      </div>
    );
  };

  return (
    <div id="BoardSideBox" className='
      hidden lg:block w-72 ml-4
      min-h-full flex-col
    '>
      {user.session && user.session.role.name == 'ADMIN' ? adminMenu() : ''}
      <div className="box link">
        <div className="head">
          <RouterLink to={CREATE_POST_PATH} className="head">
            <img src="/img/board/posticon.png"/>
            <span className = "title">게시글 작성하기</span>
          </RouterLink>
        </div>
      </div>
      <div className="box">
        <div className="head">
          <img src="/img/board/staricon.png"/>
          <span className = "title">게시판 즐겨찾기</span>
        </div>
      </div>
      <div className="box">
        <div className="head">
          <img src="/img/board/scheduleicon.png"/>
          <span className = "title">일정 알림</span>
        </div>
      </div>
      <div className="box">
        <div className="head">
          <img src="/img/board/recruiticon.png"/>
          <span className = "title">설문/모집 게시글</span>
        </div>
      </div>
    </div>
  );
}

export default SideBox;
