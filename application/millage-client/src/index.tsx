import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import './index.css';
import App from './pages/App';
import reducer from "@modules";

const store = createStore(
  reducer,
  composeWithDevTools( /* applyMiddleware(...) */ )
)

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
