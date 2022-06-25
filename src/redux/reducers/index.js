import {combineReducers} from 'redux';
import MangerReducer from './MangerReducer';
import AlertReducer from './AlertReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  MangerReducer,
  AlertReducer,
  UserReducer
});

export default rootReducer;