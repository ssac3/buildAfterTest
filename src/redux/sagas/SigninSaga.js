import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {SignInType} from 'redux/constants';
import {openAlert} from 'redux/actions/AlertAction';


axios.defaults.baseURL = ROUTES.BASE_URL;

function eacReq(data) {
  console.log(data);
  const result = axios
    .post(ROUTES.SWP_EAC_REQ, data)
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EAC_REQ).SUCCESS);
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EAC_REQ).ERROR);
      return err;
    });
  return result;
}

function* postSwpEacReq() {
  try {
    const data = yield select((state) => {
      return state.SignInReducer;
    });
    const result = yield call(eacReq, data);
    console.log(result);
    if (result.data.resCode === 0) {
      // const { token } = result.data;
      console.log(result.headers);
      console.log(result.headers.authorization);
      LOCAL_STORAGE.set('Authorization', result.headers.authorization);
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchAlert() {
  yield takeLatest(SignInType.SWP_EAC_REQ, postSwpEacReq);
}


export default function* signInSaga() {
  yield all([fork(watchAlert)]);
}