import {combineReducers} from 'redux';
import MangerReducer from './MangerReducer';
import AlertReducer from './AlertReducer';
import UserReducer from './UserReducer';
import SignInReducer from './SignInReducer';
import AdminReducer from './AdminReducer';
import ScannerReducer from './ScannerReducer';

const rootReducer = combineReducers({
  MangerReducer,
  AlertReducer,
  UserReducer,
  SignInReducer,
  AdminReducer,
  ScannerReducer
});

export default rootReducer;