import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import './index.css';
import App from './pages/App';
import reducer, {rootSaga} from '@modules';
import createSagaMiddleware from 'redux-saga';
import {createBrowserHistory} from 'history';
import {Router} from 'react-router-dom';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});

export const store: Store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            sagaMiddleware,
        ),
    ),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Router history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.getElementById('root'),
);
