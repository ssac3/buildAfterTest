import {all, fork, put, takeLatest, delay} from 'redux-saga/effects';
import {AlertType} from 'redux/constants';
import {closeAlert} from 'redux/actions/AlertAction';

function* close() {
  try {
    yield delay(2000);
    yield put(closeAlert());
  } catch (e) {
    console.log(e);
  }
}


function* watchAlert() {
  yield takeLatest(AlertType.OPEN_ALERT, close);
}

export default function* alertSaga() {
  yield all([fork(watchAlert)]);
}