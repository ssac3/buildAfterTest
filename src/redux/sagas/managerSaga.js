import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {ManagerType} from 'redux/constants';
import {SwpAtvReq, SwpAtvRes, SwpRavReq, SwpRavRes, SwpVavReq, SwpVavRes} from 'redux/actions/ManagerAction';
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

function ravReq() {
  const result = axios
    .post(ROUTES.SWP_RAV_REQ, null, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_RAV_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_RAV_REQ).ERROR);
      return err;
    });
  return result;
}

function rarReq(data) {
  const result = axios
    .post(ROUTES.SWP_RAR_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_RAV_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_RAV_REQ).ERROR);
      return err;
    });
  return result;
}

function* postSwpAtvReq() {
  try {
    const packedMsg = {id: Number(LOCAL_STORAGE.get('depId'))};
    const result = yield call(atvReq, packedMsg);

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
      yield put(SwpAtvReq(LOCAL_STORAGE.get('depId')));
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
    const packedMsg = {vId: data.vId, approvalFlag: data.approvalFlag};
    const result = yield call(varReq, packedMsg);
    if(result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpVavReq());
      data.detailInit();
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpRavReq() {
  try {
    const result = yield call(ravReq);
    if(result.resCode === 0) {
      yield put(SwpRavRes(result.data));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpRarReq() {
  try {
    const data = yield select((state) => { return state.MangerReducer; });
    const packedMsg = {
      rId: data.data.rId,
      aId: data.data.aId,
      startTime: data.data.rStartTime,
      endTime: data.data.rEndTime,
      approvalFlag: data.data.approvalFlag
    };
    console.log(packedMsg);
    const result = yield call(rarReq, packedMsg);
    if(result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpRavReq());
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
    data.closePage(0);
  } catch (e) {
    console.log(e);
  }
}



function* watchAlert() {
  yield takeLatest(ManagerType.SWP_ATV_REQ, postSwpAtvReq);
  yield takeLatest(ManagerType.SWP_ATR_REQ, postSwpAtrReq);
  yield takeLatest(ManagerType.SWP_VAV_REQ, postSwpVavReq);
  yield takeLatest(ManagerType.SWP_VAR_REQ, postSwpVarReq);
  yield takeLatest(ManagerType.SWP_RAV_REQ, postSwpRavReq);
  yield takeLatest(ManagerType.SWP_RAR_REQ, postSwpRarReq);
}


export default function* mangerSaga() {
  yield all([fork(watchAlert)]);
}