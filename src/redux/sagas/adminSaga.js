import axios from 'axios';
import {LOCAL_STORAGE, LOG, ROUTES} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {openAlert} from 'redux/actions/AlertAction';
import {AdminType} from 'redux/constants';

axios.defaults.baseURL = ROUTES.BASE_URL;
const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization')};
  console.log(headers);
  return {
    headers,
  };
};

function empinReq(data) {
  console.log('사원등록사가');
  const result = axios
    .post(ROUTES.SWP_EMPIN_REQ, data, getHeader())
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
    const data = yield select((state) => {
      return state.AdminReducer;
    });
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

function* watchAdmin() {
  yield takeLatest(AdminType.SWP_EMPIN_REQ, postSwpEmpinReq);
  // yield takeLatest(AdminType.SWP_EMPIN_RES, postSwpEmpinRes);
}

export default function* adminSaga() {
  yield all([fork(watchAdmin)]);
}