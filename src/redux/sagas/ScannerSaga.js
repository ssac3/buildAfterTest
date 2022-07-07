import axios from 'axios';
import {ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {ScannerType} from 'redux/constants';
import {openAlert} from 'redux/actions/AlertAction';

axios.defaults.baseURL = ROUTES.BASE_URL;

function qcsReq(data) {
  const result = axios
    .post(ROUTES.SWP_QCS_REQ, data)
    .then((res) => {
      console.log(LOG(ROUTES.SWP_QCS_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_QCS_REQ).ERROR);
      return err;
    });
  return result;
}


function* postSwpQcsReq() {
  try {
    const data = yield select((state) => {
      return state.ScannerReducer;
    });
    console.log(data);
    const result = yield call(qcsReq, data);
    if (result.resCode === 0 || result.resCode === 1) {
      yield put(openAlert('success', result.resMsg));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchAlert() {
  yield takeLatest(ScannerType.SWP_QCS_REQ, postSwpQcsReq);
}
export default function* ScannerSaga() {
  yield all([fork(watchAlert)]);
}