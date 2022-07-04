import axios from 'axios';
import {LOCAL_STORAGE, LOG, ROUTES} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {openAlert} from 'redux/actions/AlertAction';
import {AdminType} from 'redux/constants';
import {SwpEmpselRes} from 'redux/actions/AdminAction';


axios.defaults.baseURL = ROUTES.BASE_URL;
const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization')};
  return {
    headers,
  };
};
// 사원등록
function empinReq(data) {
  const result = axios
    .post(ROUTES.SWP_EMPIN_REQ, data, getHeader())
    .then((res) => {
      console.log(data);
      console.log(LOG(ROUTES.SWP_EMPIN_REQ).SUCCESS);
      console.log(res.data);
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
    console.log(data);
    const result = yield call(empinReq, data);

    if(result.resCode === 0) {
      yield put(openAlert('success', result.resMsg));
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
function empupReq(emp) {
  const result = axios
    .post(ROUTES.SWP_EMPUP_REQ, emp, getHeader())
    .then((res) => {
      console.log(res);
      console.log('사원수정_adminSaga');
      console.log(emp);
      console.log(LOG(ROUTES.SWP_EMPUP_REQ).SUCCESS);
      // console.log(res.emp);
      return res.emp;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EMPUP_REQ).ERROR);
      return err;
    });
  return result;
}
function* postSwpEmpupReq() {
  try {
    const emp = yield select((state) => { return state.AdminReducer; });
    console.log('postSwpEmpupReq', emp);
    console.log(emp);
    const result = yield call(empupReq, emp);

    if(result.resCode === 0) {
      yield put(openAlert('successess', result.resMsg));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}


function* watchAdmin() {
  yield takeLatest(AdminType.SWP_EMPIN_REQ, postSwpEmpinReq);
  yield takeLatest(AdminType.SWP_EMPSEL_REQ, getSwpEmpselReq);
  yield takeLatest(AdminType.SWP_EMPUP_REQ, postSwpEmpupReq);
}

export default function* adminSaga() {
  yield all([fork(watchAdmin)]);
}