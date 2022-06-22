import {combineReducers} from 'redux';
import MangerReducer from './MangerReducer';
import AlertReducer from './AlertReducer';

const rootReducer = combineReducers({
  MangerReducer,
  AlertReducer,
});

export default rootReducer;