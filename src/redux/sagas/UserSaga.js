import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {UserType} from 'redux/constants';
import {SwpDavRes, SwpSavReq, SwpSavRes} from 'redux/actions/UserAction';
import {openAlert} from 'redux/actions/AlertAction';

axios.defaults.baseURL = ROUTES.BASE_URL;
const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization')};
  console.log(headers);
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
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_DAV_REQ).ERROR);
      return err;
    });
  console.log(result);
  return result;
}

function* postSwpSavReq() {
  try {
    const result = yield call(savReq);
    console.log(result.data);
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
    console.log(result);
    if(result.resCode === 0) {
      console.log(result.data);
      yield put(SwpDavRes(result.data));
    } else {
      yield put('fail', result.resMsg);
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
}
export default function* userSaga() {
  yield all([fork(watchAlert)]);
}