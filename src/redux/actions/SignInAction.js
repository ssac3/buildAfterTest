import {SignInType, SignOutType} from 'redux/constants/actionTypes';

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

export const SwpEasReq = (history) => {
  return {
    type: SignOutType.SWP_EAS_REQ,
    history
  };
};

export const SwpEasRes = () => {
  return {
    type: SignOutType.SWP_EAS_RES
  };
};
export const SwpDlrReq = () => {
  return {
    type: SignInType.SWP_DLR_REQ,

  };
};
export const SwpDlrRes = (data) => {
  return {
    type: SignInType.SWP_DLR_RES,
    data
  };
};