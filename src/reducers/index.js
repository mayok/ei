import { combineReducers } from 'redux';
import changeStateTo from './changeStateTo';
import image from './image';

const rootReducer = combineReducers({
  changeStateTo,
  image,
});

export default rootReducer;
