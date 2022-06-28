import {combineReducers} from 'redux';
import MangerReducer from './MangerReducer';
import AlertReducer from './AlertReducer';
import UserReducer from './UserReducer';
import SignInReducer from './SignInReducer';
import AdminReducer from './AdminReducer';

const rootReducer = combineReducers({
  MangerReducer,
  AlertReducer,
  UserReducer,
  SignInReducer,
  AdminReducer
});

export default rootReducer;