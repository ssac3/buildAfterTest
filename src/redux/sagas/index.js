import {all, call} from 'redux-saga/effects';
import manager from './managerSaga';
import alert from './alertSagas';
import user from './UserSaga';
import signIn from './SigninSaga';
import admin from './adminSaga';
import scanner from './ScannerSaga';
import signOutSaga from './SignOutSaga';

export default function* rootSaga() {
  yield all(
    [
      call(manager),
      call(alert),
      call(user),
      call(signIn),
      call(admin),
      call(scanner),
      call(signOutSaga)
    ]
  );
}
