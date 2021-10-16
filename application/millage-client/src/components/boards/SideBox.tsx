import {BOARD_PATH, CREATE_BOARD_PATH, CREATE_POST_PATH} from '@constants';
import {RootState} from '@modules';
import {getRecentScheduleAsync,
  getRecruitAndPostListAsync} from '@modules/board/actions';
import {PostPartial, Schedule} from '@modules/board/types';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import AddBoardStar from './AddBoardStar';
import './sidebox.css';
import {
  CreateBoardIcon,
  PostIcon,
  RecruitIcon,
  StarIcon,
  ScheduleIcon,
} from '@images';
import {useBoard} from '@hooks/board';
import IconButton from '@mui/material/IconButton';
function SideBox() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const {
    sideboxState,
    boardListState,
  } = useBoard();
  const loading = sideboxState.loading;
  const loading2 = boardListState.loading;

  useEffect(() => {
    dispatch(getRecruitAndPostListAsync.request());
    dispatch(getRecentScheduleAsync.request());
  }, []);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };

  const openStarBoards = () => {
    setOpenDialog(true);
  };

  const renderRecruitAndPollList = () => {
    if (sideboxState.data && sideboxState.data.posts) {
      return sideboxState.data.posts.map((post: PostPartial) => {
        return (
          <div className="post link" key={post.id}>
            <RouterLink style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
            to={`/board/post/${post.id}`}
            >
              <div className="truncate">
                {post.title}
              </div>
              <div>
                {post.currentCount}/{post.totalMember}
              </div>
            </RouterLink>
          </div>
        );
      });
    }
  };

  const renderSchedules = () => {
    if (sideboxState.data && sideboxState.data.schedules) {
      return sideboxState.data.schedules.map((schedule : Schedule) => {
        const today = new Date();
        const start = new Date(schedule.start.slice(0, -1));
        let end = null;
        if (schedule.end) {
          end = new Date(schedule.end.slice(0, -1));
        }
        const betweenTime = Math.floor((today.getTime() -
        start.getTime()) / 1000 / 60);
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        let datetext = '';
        if (start == today) {
          datetext = 'D-Day';
        } else {
          datetext = `${start.getMonth()+1}/${start.getDate()}` +
          `${end ? '~' + (end.getMonth()+1)+'/' : ''}`+
          `${end ? end.getDate() : ''}`;
        }
        return (
          <div className="post" key = {schedule.id}>
            <div style={{display: 'flex'}}>
              <div className={
                schedule.groupType =='person' ? 'orange' : 'green'}
              ></div>
              {datetext}
            </div>
            <div style={{
              flex: '0 0 55%',
            }}
            className="truncate"
            data-title
            >
              {schedule.title}
            </div>
          </div>
        );
      });
    }
  };

  const adminMenu = () => {
    return (
      <div className="box link">
        <div className="head">
          <RouterLink to={CREATE_BOARD_PATH} className="head">
            <img src={CreateBoardIcon}/>
            <span className = "title">게시판 생성하기</span>
          </RouterLink>
        </div>
      </div>
    );
  };

  const renderStarBoards = () => {
    return (boardListState.data?.filter((board) => {
      return board.isStarred;
    }))?.map((board) => {
      return (
        <RouterLink
          className="link"
          to={`${BOARD_PATH}/${board.id}`}
          key={board.id}
        >
          <span className = "title" style={{
            marginLeft: '10px',
          }}>{board.title}</span>
        </RouterLink>
      );
    });
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
            <img src={PostIcon} />
            <span className = "title">게시글 작성하기</span>
          </RouterLink>
        </div>
      </div>
      <div className="box">
        <div className="head flex justify-between items-center">
          <div className="flex">
            <img src={StarIcon} />
            <span className = "title">게시판 즐겨찾기</span>
          </div>
          <div>
            <IconButton
              onClick={() =>  {
                openStarBoards();
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
        {!loading && !loading2? renderStarBoards() :
            'loading...'
        }
      </div>
      <div className="box">
        <div className="head">
          <img src={ScheduleIcon}/>
          <span className = "title">일정 알림</span>
        </div>
        <div>
          {!loading && !loading2? renderSchedules() :
            'loading...'
          }
        </div>
      </div>
      <div className="box">
        <div className="head">
          <img src={RecruitIcon}/>
          <span className = "title">최근 모집 게시글</span>
        </div>
        <div>
          {!loading && !loading2? renderRecruitAndPollList() :
            'loading...'
          }
        </div>
      </div>
      <AddBoardStar
        open={openDialog}
        closeHandler={closeDialog}
      />
    </div>
  );
}

export default SideBox;
