import axios from 'axios';
import {LOCAL_STORAGE, LOG, ROUTES} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {openAlert} from 'redux/actions/AlertAction';
import {AdminType} from 'redux/constants';
import {SwpEmpmkRes, SwpEmpselReq, SwpEmpselRes} from 'redux/actions/AdminAction';


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
// 사번생성
function empmkReq() {
  const result = axios
    // .get(ROUTES.SWP_EMPMK_REQ, '', getHeader())
    .get(ROUTES.SWP_EMPMK_REQ, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EMPMK_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EMPMK_REQ).ERROR);
      return err;
    });
  return result;
}
function* getSwpEmpmkReq() {
  try {
    const result = yield call(empmkReq);
    if (result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpEmpmkRes(result.data));
    }
  } catch (e) {
    console.log(e);
  }
}
// 사원등록
function empinReq(data) {
  console.log(data);
  const result = axios
    .post(ROUTES.SWP_EMPIN_REQ, data, getImgHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EMPIN_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EMPIN_REQ).ERROR);
      return err;
    });
  return result;
}
function* postSwpEmpinReq() {
  try {
    const data = yield select((state) => { return state.AdminReducer; });
    // console.log(' adminSaga111', data.emp.get('image'));
    const result = yield call(empinReq, data.emp);
    if(result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpEmpselReq());
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}
// 사원목록
function empselReq() {
  const result = axios
    .get(ROUTES.SWP_EMPSEL_REQ, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EMPSEL_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EMPSEL_REQ).ERROR);
      return err;
    });
  return result;
}
function* getSwpEmpselReq() {
  try {
    const result = yield call(empselReq);
    if (result.resCode === 0) {
      yield put(SwpEmpselRes(result.data));
    }
  } catch (e) {
    console.log(e);
  }
}

// 사원수정
function empupReq(change) {
  const result = axios
    .post(ROUTES.SWP_EMPUP_REQ, change.change, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EMPUP_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EMPUP_REQ).ERROR);
      return err;
    });
  return result;
}
function* postSwpEmpupReq() {
  try {
    const data = yield select((state) => { return state.AdminReducer; });
    const result = yield call(empupReq, data);
    if(result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpEmpselReq());
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

// 사원 삭제
function empdelReq(leave) {
  const result = axios
    .post(ROUTES.SWP_EMPDEL_REQ, leave.leave, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EMPDEL_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EMPDEL_REQ).ERROR);
      return err;
    });
  return result;
}
function* postSwpEmpdelReq() {
  try {
    const data = yield select((state) => { return state.AdminReducer; });
    const packedMsg = {leave: data.leave};
    console.log(packedMsg);
    const result = yield call(empdelReq, packedMsg);
    console.log(result);
    if(result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
      yield put(SwpEmpselReq());
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}


function* watchAdmin() {
  yield takeLatest(AdminType.SWP_EMPMK_REQ, getSwpEmpmkReq);
  yield takeLatest(AdminType.SWP_EMPIN_REQ, postSwpEmpinReq);
  yield takeLatest(AdminType.SWP_EMPSEL_REQ, getSwpEmpselReq);
  yield takeLatest(AdminType.SWP_EMPUP_REQ, postSwpEmpupReq);
  yield takeLatest(AdminType.SWP_EMPDEL_REQ, postSwpEmpdelReq);
}

export default function* adminSaga() {
  yield all([fork(watchAdmin)]);
}