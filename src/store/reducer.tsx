import { combineReducers } from '@reduxjs/toolkit';
import userInfo from './userInfo';
import matrix from './matrix';
import gameInfo from './gameInfo';

export default combineReducers({
  userInfo,
  matrix,
  gameInfo,
});
