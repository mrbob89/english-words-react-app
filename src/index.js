import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import './index.css';
import App from './App';
import appEpic from './epic';
import rootReducer from './data/reducers';

const epicMiddleware = createEpicMiddleware(appEpic);
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
