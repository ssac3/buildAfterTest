import {AdminType} from 'redux/constants/actionTypes';

export const SwpEmpinReq = (data) => {
  return {
    type: AdminType.SWP_EMPIN_REQ,
    data
  };
};

export const SwpEmpinRes = () => {
  return {
    type: AdminType.SWP_EMPIN_RES,
  };
};