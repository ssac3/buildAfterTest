import axios from 'axios';
import {BASE_URL, SWP_ATV_REQ, SWP_ATR_REQ} from 'utils/constants/api';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {ManagerType} from 'redux/constants';
import {SwpAtvRes} from 'redux/actions/ManagerAction';
import {openAlert} from 'redux/actions/AlertAction';

axios.defaults.baseURL = BASE_URL;

function atvReq(data) {
  const result = axios
    .post(SWP_ATV_REQ, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return result;
}

function atrReq(data) {
  const result = axios
    .post(SWP_ATR_REQ, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return result;
}


function* postSwpAtvReq() {
  try {
    const data = yield select((state) => {
      return state.MangerReducer;
    });
    const result = yield call(atvReq, data);

    if (result.resCode === 0) {
      const {name, startTime, endTime} = result.data;
      yield put(SwpAtvRes(name, startTime, endTime));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpAtrReq() {
  try {
    const data = yield select((state) => {
      return state.MangerReducer;
    });
    const result = yield call(atrReq, data);

    if (result.resCode === 0) {
      console.log(result.resMsg);
      yield put(openAlert('success', result.resMsg));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}


function* watchAlert() {
  yield takeLatest(ManagerType.SWP_ATV_REQ, postSwpAtvReq);
  yield takeLatest(ManagerType.SWP_ATR_REQ, postSwpAtrReq);
}


export default function* mangerSaga() {
  yield all([fork(watchAlert)]);
}