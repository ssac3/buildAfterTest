import {all, call} from 'redux-saga/effects';
import manager from './managerSaga';
import alert from './alertSags';
import user from './UserSaga';
import signIn from './SigninSaga';

export default function* rootSaga() {
  yield all([call(manager), call(alert), call(user), call(signIn)]);
}
