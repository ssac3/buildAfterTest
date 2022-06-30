import {AdminType} from 'redux/constants/actionTypes';

export const SwpEmpinReq = (emp) => {
  return {
    type: AdminType.SWP_EMPIN_REQ,
    emp
  };
};

export const SwpEmpinRes = () => {
  return {
    type: AdminType.SWP_EMPIN_RES,
  };
};