import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {
  BOARD_PATH,
  BOARD_VIEW_PATH,
  POST_VIEW_PATH,
  ROOT_PATH,
} from '@constants';
import MainPage from './MainPage';
import BoardViewPage from './BoardView';
import {BoardHeader, SideBox} from '@components/boards';

function BoardRoutes() {
  return (
    <div className='w-full flex flex-col' style={{
      minHeight: '80vh',
    }}>
      <BoardHeader />

      {/* Content Wrapper */}
      <div className='
        max-w-screen-xl mx-auto w-full flex-1 my-6
        flex flex-row justify-between
      '>

        {/* Main Component */}
        <div className='flex-1 w-full'>
          <Switch>
            <Route exact path={ROOT_PATH} component={MainPage} />
            <Route exact path={BOARD_PATH} component={MainPage} />
            <Route path={POST_VIEW_PATH} render={
              () => <div>Post View Page</div>
            } />
            <Route path={BOARD_VIEW_PATH} component={BoardViewPage} />
          </Switch>
        </div>

        <SideBox />
      </div>
    </div>
  );
}

export default BoardRoutes;
