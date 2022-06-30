import axios from 'axios';
import {LOCAL_STORAGE, LOG, ROUTES} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {openAlert} from 'redux/actions/AlertAction';
import {AdminType} from 'redux/constants';
import {SwpEmpSelRes} from 'redux/actions/AdminAction';


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
      yield put(SwpEmpSelRes(result.data));
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchAdmin() {
  yield takeLatest(AdminType.SWP_EMPIN_REQ, postSwpEmpinReq);
  yield takeLatest(AdminType.SWP_EMPSEL_REQ, getSwpEmpselReq);
}

export default function* adminSaga() {
  yield all([fork(watchAdmin)]);
}