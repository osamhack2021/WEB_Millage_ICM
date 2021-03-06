import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {
  BOARD_PATH,
  BOARD_VIEW_PATH,
  CREATE_POST_PATH,
  POST_VIEW_PATH,
  ROOT_PATH,
} from '@constants';
import BoardMainPage from './BoardMainPage';
import BoardViewPage from './BoardViewPage';
import {BoardHeader, SideBox} from '@components/boards';
import {XLayout} from '@components/common';
import PostViewPage from './PostViewPage';
import CreatePostPage from './CreatePostPage';

function BoardRoutes() {
  return (
    <div className='w-full flex flex-col' style={{
      minHeight: '80vh',
    }}>
      <BoardHeader />

      {/* Content Wrapper */}
      <XLayout className='
        mx-auto w-full flex-1 my-8
        flex flex-row justify-between
      '>

        {/* Main Component */}
        <div className='flex-1 w-full'>
          <Switch>
            <Route exact path={ROOT_PATH} component={BoardMainPage} />
            <Route exact path={BOARD_PATH} component={BoardMainPage} />
            <Route path={POST_VIEW_PATH} component={PostViewPage} />
            <Route path={BOARD_VIEW_PATH} component={BoardViewPage} />
            <Route path={CREATE_POST_PATH} component={CreatePostPage} />
          </Switch>
        </div>

        <SideBox />
      </XLayout>
    </div>
  );
}

export default BoardRoutes;
