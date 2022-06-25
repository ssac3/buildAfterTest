import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {ManagerType} from 'redux/constants';
import {SwpAtvRes, SwpVavReq, SwpVavRes} from 'redux/actions/ManagerAction';
import {openAlert} from 'redux/actions/AlertAction';

axios.defaults.baseURL = ROUTES.BASE_URL;
const getHeader = () => {
  const headers = {Authorization: LOCAL_STORAGE.get('Authorization')};
  return {
    headers,
  };
};

function atvReq(data) {
  const result = axios
    .post(ROUTES.SWP_ATV_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_ATV_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_ATV_REQ).ERROR);
      return err;
    });

  return result;
}

function atrReq(data) {
  const result = axios
    .post(ROUTES.SWP_ATR_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_ATR_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_ATR_REQ).ERROR);
      return err;
    });
  return result;
}

function vavReq() {
  const result = axios
    .post(ROUTES.SWP_VAV_REQ, null, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_VAV_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_VAV_REQ).ERROR);
      return err;
    });

  return result;
}

function varReq(data) {
  const result = axios
    .post(ROUTES.SWP_VAR_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_VAR_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_VAR_REQ).ERROR);
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
      yield put(openAlert('success', result.resMsg));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpVavReq() {
  try {
    const result = yield call(vavReq);

    if(result.resCode === 0) {
      yield put(SwpVavRes(result.data));
    }else{
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpVarReq() {
  try {
    const data = yield select((state) => {
      return state.MangerReducer;
    });

    const result = yield call(varReq, data);
    if(result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpVavReq());
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}


function* watchAlert() {
  yield takeLatest(ManagerType.SWP_ATV_REQ, postSwpAtvReq);
  yield takeLatest(ManagerType.SWP_ATR_REQ, postSwpAtrReq);
  yield takeLatest(ManagerType.SWP_VAV_REQ, postSwpVavReq);
  yield takeLatest(ManagerType.SWP_VAR_REQ, postSwpVarReq);
}


export default function* mangerSaga() {
  yield all([fork(watchAlert)]);
}