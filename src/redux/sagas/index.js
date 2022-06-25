import {all, call} from 'redux-saga/effects';
import manager from './managerSaga';
import alert from './alertSags';
import user from './UserSaga';

export default function* rootSaga() {
  yield all([call(manager), call(alert)]);
  yield all([call(user), call(alert)]);
}
