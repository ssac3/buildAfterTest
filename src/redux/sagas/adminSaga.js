import axios from 'axios';
import {LOCAL_STORAGE, LOG, ROUTES} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {openAlert} from 'redux/actions/AlertAction';
import {AdminType} from 'redux/constants';

axios.defaults.baseURL = ROUTES.BASE_URL;
const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization')};
  return {
    headers,
  };
};

function empinReq(data) {
  const result = axios
    .post(ROUTES.SWP_EMPIN_REQ, data, getHeader())
    .then((res) => {
      console.log(data);
      console.log('1111');
      console.log(LOG(ROUTES.SWP_EMPIN_REQ).SUCCESS);
      console.log(res.data);
      console.log('2222');
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

function* watchAdmin() {
  yield takeLatest(AdminType.SWP_EMPIN_REQ, postSwpEmpinReq);
  // yield takeLatest(AdminType.SWP_EMPIN_RES, postSwpEmpinRes);
}

export default function* adminSaga() {
  yield all([fork(watchAdmin)]);
}