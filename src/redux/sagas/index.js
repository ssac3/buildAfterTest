import {all, call} from 'redux-saga/effects';
import manager from './managerSaga';
import alert from './alertSags';

export default function* rootSaga() {
  yield all([call(manager), call(alert)]);
}
