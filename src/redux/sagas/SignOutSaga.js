import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {SignOutType} from 'redux/constants';
import {SwpEasRes} from 'redux/actions/SignInAction';
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

function easReq(data) {
  const result = axios
    .get(ROUTES.SWP_EAS_REQ, getHeader(), data)
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EAS_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EAS_REQ).ERROR);
      return err;
    });
  return result;
}

function* postSwpEasReq() {
  try {
    const selector = yield select((state) => {
      return state.SignInReducer;
    });
    const {history} = selector;
    const result = yield call(easReq);
    if (result.resCode === 0) {
      LOCAL_STORAGE.clear();
      history.push('/');
      yield put(SwpEasRes());
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchAlert() {
  yield takeLatest(SignOutType.SWP_EAS_REQ, postSwpEasReq);
}

export default function* signOutSaga() {
  yield all([fork(watchAlert)]);
}