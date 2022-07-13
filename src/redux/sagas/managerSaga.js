import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {ManagerType} from 'redux/constants';
import {
  SwpAtvReq,
  SwpAtvRes,
  SwpRavReq,
  SwpRavRes,
  SwpVavReq,
  SwpVavRes,
  SwpEivRes,
  SwpEadRes,
  SwpEamRes,
  SwpEavRes,
  SwpEovRes,
  SwpEmpRes,
} from 'redux/actions/ManagerAction';
import {openAlert} from 'redux/actions/AlertAction';
import {resSuccess} from 'components/Interceptors/ResInterceptor';

axios.defaults.baseURL = ROUTES.BASE_URL;
axios.interceptors.response.use(resSuccess);
const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization'),
    Refresh_token: LOCAL_STORAGE.get('Refresh_token')
  };
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

function vavReq(data) {
  const result = axios
    .post(ROUTES.SWP_VAV_REQ, data, getHeader())
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

function ravReq(data) {
  const result = axios
    .post(ROUTES.SWP_RAV_REQ, data, getHeader())
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

function eivReq(data) {
  const result = axios
    .post(ROUTES.SWP_EIV_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EIV_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EIV_REQ).ERROR);
      return err;
    });
  return result;
}

function eadReq(data) {
  const result = axios
    .post(ROUTES.SWP_EAD_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EAD_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EAD_REQ).ERROR);
      return err;
    });
  return result;
}

function eamReq(data) {
  const result = axios
    .post(ROUTES.SWP_EAM_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EAM_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EAD_REQ).ERROR);
      return err;
    });
  return result;
}

function eavReq(data) {
  const result = axios
    .post(ROUTES.SWP_EAV_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EAV_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EAD_REQ).ERROR);
      return err;
    });
  return result;
}

function eovReq(data) {
  const result = axios
    .post(ROUTES.SWP_EOV_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EAV_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EAD_REQ).ERROR);
      return err;
    });
  return result;
}

function empReq(data) {
  const result = axios
    .post(ROUTES.SWP_EMP_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EMP_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EAD_REQ).ERROR);
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
    const data = yield select((state) => state.MangerReducer);
    const packedMsg = {id: data.id};
    const result = yield call(vavReq, packedMsg);
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
      yield put(SwpVavReq(LOCAL_STORAGE.get('depId')));
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
    const data = yield select((state) => state.MangerReducer);
    const packedMsg = {id: data.id};
    const result = yield call(ravReq, packedMsg);
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
    const result = yield call(rarReq, packedMsg);
    if(result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpRavReq(LOCAL_STORAGE.get('depId')));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
    data.closePage(0);
  } catch (e) {
    console.log(e);
  }
}

function* postSwpEivReq() {
  try {
    const data = yield select((state) => state.MangerReducer);
    const packedMsg = {id: data.id};
    const result = yield call(eivReq, packedMsg);
    if(result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpEivRes(result.data));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpEadReq() {
  try {
    const data = yield select((state) => state.MangerReducer);
    const packedMsg = {username: data.username, findDate:data.findDate};
    const result = yield call(eadReq, packedMsg);

    if(result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpEadRes(result.data));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpEamReq() {
  try {
    const data = yield select((state) => state.MangerReducer);
    const packedMsg = {username:data.username, year: data.year};
    const result = yield call(eamReq, packedMsg);

    if(result.resCode === 0) {
      yield put(SwpEamRes(result.data));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}


function* postSwpEavReq() {
  try {
    const data = yield select((state) => state.MangerReducer);
    const packedMsg = {username:data.username, findDate: data.findDate};
    const result = yield call(eavReq, packedMsg);
    if(result.resCode === 0) {
      yield put(SwpEavRes(result.data));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpEovReq() {
  try {
    const data = yield select((state) => state.MangerReducer);
    const packedMsg = {depId: data.depId, findDate: data.findDate};
    const result = yield call(eovReq, packedMsg);

    if(result.resCode === 0) {
      yield put(SwpEovRes(result.data));
    } else {
      yield put(openAlert('fail', '에러가 발생했습니다.'));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpEmpReq() {
  try {
    const data = yield select((state) => state.MangerReducer);
    const packedMsg = {depId: data.depId};
    const result = yield call(empReq, packedMsg);
    if(result.resCode === 0) {
      yield put(SwpEmpRes(result.data));
    } else {
      yield put(openAlert('fail', '에러가 발생했습니다.'));
    }
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
  yield takeLatest(ManagerType.SWP_EIV_REQ, postSwpEivReq);
  yield takeLatest(ManagerType.SWP_EAD_REQ, postSwpEadReq);
  yield takeLatest(ManagerType.SWP_EAM_REQ, postSwpEamReq);
  yield takeLatest(ManagerType.SWP_EAV_REQ, postSwpEavReq);
  yield takeLatest(ManagerType.SWP_EOV_REQ, postSwpEovReq);
  yield takeLatest(ManagerType.SWP_EMP_REQ, postSwpEmpReq);
}


export default function* mangerSaga() {
  yield all([fork(watchAlert)]);
}