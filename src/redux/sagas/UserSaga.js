import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {UserType} from 'redux/constants';
import {SwpSavRes} from 'redux/actions/UserAction';

axios.defaults.baseURL = ROUTES.BASE_URL;
const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization')};
  console.log(headers);
  return {
    headers,
  };
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

function davReq() {
  console.log('in');
  const result = axios
    .get(ROUTES.SWP_DAV_REQ, getHeader())
    .then((res) => {
      console.log(LOG(ROUTES.SWP_DAV_REQ).SUCCESS);
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_DAV_REQ).ERROR);
      return err;
    });
  return result;
}

function* postSwpSavReq() {
  try {
    // const data = yield select((state) => {
    //   return state.UserReducer;
    // });
    const result = yield call(savReq);
    console.log(result.data);
    if (result.resCode === 0) {
      const {name, username, department, position, email, manager, location, qrPath} = result.data;
      yield put(
        SwpSavRes(name, String(username), department, position, email, manager, location, qrPath)
      );
    }
  } catch (e) {
    console.log(e);
  }
}
function* postSwpDavReq() {
  try {
    // const data = yield select((state) => {
    //   return state.UserReducer;
    // });
    const result = yield call(davReq);
    console.log(result);
    // if(result.resCode === 0) {
    //   yield put(
    //     SwpDavRes(info)
    //   );
    // } else {
    //   yield put('fail', result.res);
    // }
  } catch (e) {
    console.log(e);
  }
}
function* watchAlert() {
  yield takeLatest(UserType.SWP_SAV_REQ, postSwpSavReq);
  yield takeLatest(UserType.SWP_DAV_REQ, postSwpDavReq);
}
export default function* userSaga() {
  yield all([fork(watchAlert)]);
}