import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {
  BOARD_PATH,
  BOARD_VIEW_PATH,
  POST_VIEW_PATH,
  ROOT_PATH,
} from '@constants';
import BoardMainPage from './BoardMainPage';
import BoardViewPage from './BoardView';
import {BoardHeader, SideBox} from '@components/boards';
import {XLayout} from '@components/common';
import PostViewPage from './PostViewPage';

function BoardRoutes() {
  return (
    <div className='w-full flex flex-col' style={{
      minHeight: '80vh',
    }}>
      <BoardHeader />

      {/* Content Wrapper */}
      <XLayout className='
        mx-auto w-full flex-1 my-6
        flex flex-row justify-between
      '>

        {/* Main Component */}
        <div className='flex-1 w-full'>
          <Switch>
            <Route exact path={ROOT_PATH} component={BoardMainPage} />
            <Route exact path={BOARD_PATH} component={BoardMainPage} />
            <Route path={POST_VIEW_PATH} component={PostViewPage} />
            <Route path={BOARD_VIEW_PATH} component={BoardViewPage} />
          </Switch>
        </div>

        <SideBox />
      </XLayout>
    </div>
  );
}

export default BoardRoutes;
