import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Navigation
import { MainNavReducer } from '../NavigationConfiguration';
import { DrawerNav } from './components/Drawer/DrawerConfiguration';
import loginReducer from './reducers/loginReducer';
import movesReducer from './reducers/movesReducer';
import moveDetailsReducer from './reducers/moveDetailsReducer';
import mailsReducer from './reducers/mailsReducer';
import staffsReducer from './reducers/staffsReducer';
import composeReducer from './reducers/composeReducer';

// Middleware
const middleware = () => {
  return applyMiddleware(thunk, logger);
};


export default createStore(
  combineReducers({
    nav: MainNavReducer,
    login: loginReducer,
    moves: movesReducer,
    movedetail: moveDetailsReducer,
    mails: mailsReducer,
    staffs: staffsReducer,
    compose: composeReducer
  }),
  middleware()
);
