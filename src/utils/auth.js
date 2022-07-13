import {LOCAL_STORAGE, API} from './constants';
export const getCurrentUser = () => {
  const access = LOCAL_STORAGE.get('Authorization');
  const refresh = LOCAL_STORAGE.get('Refresh_token');
  if(access && refresh) {
    return true;
  }
  return false;
};

export const getRole = () => {
  const role = LOCAL_STORAGE.get('ROLE');
  let result = '';
  if(role === '0') {
    result = API.ADMIN;
  } else if(role === '1') {
    result = API.MANAGER;
  } else if(role === '2') {
    result = API.USER;
  } else {
    result = API.ROOT;
  }
  return result;
};

export const checkValidURL = () => {
  const role = LOCAL_STORAGE.get('ROLE');
  let result = '';
  if(role === '0') {
    result = [API.ADMIN];
  } else if(role === '1') {
    result = [API.MANAGER, API.USER];
  } else if(role === '2') {
    result = [API.USER];
  } else {
    result = [API.ROOT];
  }
  return result;
};