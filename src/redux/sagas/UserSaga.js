import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {UserType} from 'redux/constants';
import {SwpDavRes, SwpSavReq, SwpSavRes, SwpUagRes} from 'redux/actions/UserAction';
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

const getImgHeader = () => {
  const headers = {
    Authorization: LOCAL_STORAGE.get('Authorization'),
    Refresh_token: LOCAL_STORAGE.get('Refresh_token'),
    'Content-Type': 'multipart/form-data',
  };
  return { headers };
};

function savReq() {
  const result = axios
    .get(ROUTES.SWP_SAV_REQ, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_SAV_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_SAV_REQ).ERROR);
      return err;
    });

  return result;
}

function saprReq(data) {
  const result = axios
    .post(ROUTES.SWP_SAPR_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_SAPR_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_SAPR_REQ).ERROR);
      return err;
    });
  return result;
}

function sairReq(data) {
  const result = axios
    .post(ROUTES.SWP_SAIR_REQ, data, getImgHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_SAIR_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_SAIR_REQ).ERROR);
      return err;
    });
  return result;
}

function davReq(data) {
  console.log(data);
  const result = axios
    .post(ROUTES.SWP_DAV_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_DAV_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_DAV_REQ).ERROR);
      return err;
    });
  return result;
}

function vaReq(data) {
  console.log(data);
  const result = axios
    .post(ROUTES.SWP_VA_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_VA_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_VA_REQ).ERROR);
      return err;
    });
  return result;
}

function aarReq(data) {
  const result = axios
    .post(ROUTES.SWP_AAR_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_AAR_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_AAR_REQ).ERROR);
      return err;
    });
  return result;
}

function vcReq(data) {
  console.log(data);
  const result = axios
    .post(ROUTES.SWP_VC_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_VC_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_VC_REQ).ERROR);
      return err;
    });
  return result;
}
function uagReq(data) {
  const result = axios
    .post(ROUTES.SWP_UAG_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_UAG_REQ));
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_UAG_REQ).ERROR);
      return err;
    });

  return result;
}

function* postSwpSavReq() {
  try {
    const result = yield call(savReq);
    if (result.resCode === 999) {
      LOCAL_STORAGE.clear();
    } else if (result.resCode === 0) {
      const {name, username, department, position, email, manager, location, qrPath, img} =
        result.data;
      yield put(
        SwpSavRes(
          name,
          String(username),
          department,
          position,
          email,
          manager,
          location,
          qrPath,
          img
        )
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpSaprReq() {
  try {
    const data = yield select((state) => {
      return state.UserReducer;
    });
    const result = yield call(saprReq, data);
    if (result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpSairReq() {
  try {
    const data = yield select((state) => {
      return state.UserReducer;
    });
    const result = yield call(sairReq, data.data);
    if (result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpSavReq());
    } else {
      yield put(openAlert('fail', '이미지 업데이트 실패'));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpDavReq() {
  try {
    const data = yield select((state) => {
      return state.UserReducer;
    });
    const result = yield call(davReq, data);
    if(result.resCode === 0) {
      yield put(SwpDavRes(result.data));
    } else {
      yield put('fail', result.resMsg);
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpAarReq() {
  try {
    const data = yield select((state) => {
      return state.UserReducer;
    });
    const packed = {month: data.startTime.slice(0, 7)};
    const result = yield call(aarReq, data);
    if (result.resCode === 0) {
      const result2 = yield call(davReq, packed);
      if(result2.resCode === 0) {
        yield put(SwpDavRes(result2.data));
        yield put(openAlert('success', result2.resMsg));
      }
      yield put(openAlert('success', result.resMsg));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}
function* postSwpVaReq() {
  try {
    const data = yield select((state) => {
      return state.UserReducer;
    });
    const packed = {month: data.date.slice(0, 7)};
    const result = yield call(vaReq, data);
    if (result.resCode === 0) {
      const result2 = yield call(davReq, packed);
      if (result2.resCode === 0) {
        yield put(SwpDavRes(result2.data));
        yield put(openAlert('success', result2.resMsg));
      }
      yield put(openAlert('success', result.resMsg));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}
function* postSwpVcReq() {
  try {
    const data = yield select((state) => {
      return state.UserReducer;
    });
    const packedMsg = {id: data.id, date: data.date};
    const result = yield call(vcReq, packedMsg);
    if (result.resCode === 0) {
      const packedMsg2 = {id: data.id, month: data.date.slice(0, 7)};
      const result2 = yield call(davReq, packedMsg2);
      if (result2.resCode === 0) {
        yield put(SwpDavRes(result2.data));
        yield put(openAlert('success', result2.resMsg));
      }
      yield put(openAlert('success', result.resMsg));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpUagReq() {
  try {
    const data = yield select((state) => state.UserReducer);
    const result = yield call(uagReq, data);

    if(result.resCode === 0) {
      yield put(SwpUagRes(result.data));
    } else {
      yield put(openAlert('fail', '에러가 발생했습니다.'));
    }
  } catch (e) {
    console.log(e);
  }
}
function* watchAlert() {
  yield takeLatest(UserType.SWP_SAV_REQ, postSwpSavReq);
  yield takeLatest(UserType.SWP_SAPR_REQ, postSwpSaprReq);
  yield takeLatest(UserType.SWP_DAV_REQ, postSwpDavReq);
  yield takeLatest(UserType.SWP_SAIR_REQ, postSwpSairReq);
  yield takeLatest(UserType.SWP_VA_REQ, postSwpVaReq);
  yield takeLatest(UserType.SWP_AAR_REQ, postSwpAarReq);
  yield takeLatest(UserType.SWP_VC_REQ, postSwpVcReq);
  yield takeLatest(UserType.SWP_UAG_REQ, postSwpUagReq);
}

export default function* userSaga() {
  yield all([fork(watchAlert)]);
}
