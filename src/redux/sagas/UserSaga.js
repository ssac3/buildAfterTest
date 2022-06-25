import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {UserType} from 'redux/constants';
import {SwpSavRes} from 'redux/actions/UserAction';

axios.defaults.baseURL = ROUTES.BASE_URL;
const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization')};
  return {
    headers,
  };
};

function savReq(data) {
  const result = axios
    .post(ROUTES.SWP_SAV_REQ, data, getHeader())
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

function* postSwpSavReq() {
  try {
    const data = yield select((state) => {
      return state.UserReducer;
    });
    const result = yield call(savReq, data);

    if (result.resCode === 0) {
      const {name, department, position, email, manager, location, qrPath} = result.data;
      yield put(SwpSavRes(name, department, position, email, manager, location, qrPath));
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchAlert() {
  yield takeLatest(UserType.SWP_SAV_REQ, postSwpSavReq);
  yield takeLatest(UserType.SWP_SAV_REQ, postSwpSavReq);
}

export default function* userSaga() {
  yield all([fork(watchAlert)]);
}