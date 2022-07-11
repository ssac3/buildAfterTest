import {LOCAL_STORAGE} from 'utils/constants';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import store from 'redux/stores';
import history from 'utils/history';
import {openAlert} from 'redux/actions/AlertAction';
const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization')};
  return {
    headers,
  };
};

export const resSuccess = async (res) => {
  if (res.data.resCode === 777 || res.data.resCode === 999) {
    LOCAL_STORAGE.clear();
    store.dispatch(openAlert('fail', '재로그인이 필요합니다.'));
    setTimeout(() => {
      history.push('/');
      window.location.reload();
    }, 3000);
  }
  if (res.data.resCode === 555) {
    const dataMethod = res.config.method;
    const original = res.config.baseURL.concat(res.config.url);
    LOCAL_STORAGE.set('Authorization', res.headers.authorization);
    switch (dataMethod) {
      case 'post':
        console.log(getHeader());
        return await axios.post(original, res.config.data ? res.config.data : null, getHeader());
      case 'get':
      default:
        console.log(getHeader());
        return await axios.get(original, getHeader());
    }
  }
  return res;
};