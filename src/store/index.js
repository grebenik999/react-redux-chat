import { applyMiddleware, createStore } from 'redux';
import reducer from './auth/reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const indexStore = createStore(
    reducer,
    applyMiddleware(thunk, logger));