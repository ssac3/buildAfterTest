import {combineReducers} from 'redux';
import MangerReducer from './MangerReducer';
import AlertReducer from './AlertReducer';
import UserReducer from './UserReducer';
import SignInReducer from './SignInReducer';

const rootReducer = combineReducers({
  MangerReducer,
  AlertReducer,
  UserReducer,
  SignInReducer
});

export default rootReducer;