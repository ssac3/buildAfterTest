import {all, call} from 'redux-saga/effects';
import manager from './managerSaga';

export default function* rootSaga() {
  yield all([call(manager)]);
}
