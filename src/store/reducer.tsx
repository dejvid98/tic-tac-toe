import { combineReducers } from '@reduxjs/toolkit';
import userInfo from './userInfo';
import matrix from './matrix';

export default combineReducers({
  userInfo,
  matrix,
});
