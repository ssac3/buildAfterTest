import {SignInType} from 'redux/constants/actionTypes';

export const SwpEacReq = (username, password, history) => {
  return {
    type: SignInType.SWP_EAC_REQ,
    username,
    password,
    history
  };
};

export const SwpEacRes = (data) => {
  return {
    type: SignInType.SWP_EAC_RES,
    data
  };
};
