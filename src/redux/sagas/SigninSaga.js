import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {SignInType} from 'redux/constants';
import {openAlert} from 'redux/actions/AlertAction';
import {SwpDlrRes, SwpEacRes} from 'redux/actions/SignInAction';

axios.defaults.baseURL = ROUTES.BASE_URL;

const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization'),
    Refresh_token: LOCAL_STORAGE.get('Refresh_token')
  };
  return {
    headers,
  };
};

function eacReq(data) {
  const result = axios
    .post(ROUTES.SWP_EAC_REQ, data)
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EAC_REQ).SUCCESS);
      return res;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EAC_REQ).ERROR);
      return err;
    });
  return result;
}

function dlrReq() {
  const result = axios
    .get(ROUTES.SWP_DLR_REQ, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_DLR_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_DLR_REQ).ERROR);
      return err;
    });
  return result;
}

function* postSwpEacReq() {
  try {
    const selector = yield select((state) => {
      return state.SignInReducer;
    });
    const {history} = selector;
    const packedData = {username:selector.username, password:selector.password};
    const result = yield call(eacReq, packedData);
    if (result.data.resCode === 0) {
      LOCAL_STORAGE.set('Authorization', result.headers.authorization);
      LOCAL_STORAGE.set('Refresh_token', result.headers.refresh_token);

      if(result.data.data.role === '0') {
        console.log('[ROLE] ADMIN');
        yield put(SwpEacRes('ADMIN'));
        history.push('/admin');
      } else if(result.data.data?.depId !== undefined && result.data.data?.role === '1') {
        console.log('[ROLE] MANAGER');
        LOCAL_STORAGE.set('depId', result?.data?.data.depId);
        yield put(SwpEacRes('MANAGER'));
        history.push('/manager');
      } else if(result.data.data?.role === '2') {
        console.log('[ROLE] USER');
        yield put(SwpEacRes('USER'));
        history.push('/user');
      }
    } else {
      yield put(openAlert('fail', result.data.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}
function* postSwpDlrReq() {
  try {
    const result = yield call(dlrReq);
    console.log(result);
    if(result.resCode === 0) {
      yield put(SwpDlrRes(result));
      yield put(openAlert('success', result.resMsg));
    } else {
      yield put(openAlert('fail', result.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}
function* watchAlert() {
  yield takeLatest(SignInType.SWP_EAC_REQ, postSwpEacReq);
  yield takeLatest(SignInType.SWP_DLR_REQ, postSwpDlrReq);
}
export default function* signInSaga() {
  yield all([fork(watchAlert)]);
}