import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {UserType} from 'redux/constants';
import {SwpAarRes, SwpDavRes, SwpSavReq, SwpSavRes, SwpVaRes, SwpUagRes} from 'redux/actions/UserAction';
import {openAlert} from 'redux/actions/AlertAction';

axios.defaults.baseURL = ROUTES.BASE_URL;
const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization')};
  return {
    headers,
  };
};

const getImgHeader = () => {
  const headers = {
    Authorization: LOCAL_STORAGE.get('Authorization'),
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
  console.log(data);
  const result = axios
    .post(ROUTES.SWP_AAR_REQ, data, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_AAR_REQ));
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_AAR_REQ).ERROR);
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
    if (result.resCode === 0) {
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
    console.log(data);
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
    console.log(data);
    const result = yield call(aarReq, data);
    console.log(result);
    if (result.resCode === 0) {
      yield put(SwpAarRes(result.data));
    } else {
      yield put('fail', result.resMsg);
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
    console.log(data);
    const result = yield call(vaReq, data);
    switch (result.resCode) {
      case 0:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('success', result.resMsg));
        break;
      case 1:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('fail', result.resMsg));
        break;
      case 2:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('fail', result.resMsg));
        break;
      case 3:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('fail', result.resMsg));
        break;
      case 4:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('fail', result.resMsg));
        break;
      case 5:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('fail', result.resMsg));
        break;
      case 6:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('fail', result.resMsg));
        break;
      case 7:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('fail', result.resMsg));
        break;
      case 8:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('fail', result.resMsg));
        break;
      case 9:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('fail', result.resMsg));
        break;
      case 10:
        yield put(SwpVaRes(result.data));
        yield put(openAlert('fail', result.resMsg));
        break;
      default:
        yield put('fail', result.resMsg);
        yield put(openAlert('fail', result.resMsg));
        break;
    }
  }catch (e) {
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
    console.log(result);
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
  yield takeLatest(UserType.SWP_UAG_REQ, postSwpUagReq);
}
export default function* userSaga() {
  yield all([fork(watchAlert)]);
}