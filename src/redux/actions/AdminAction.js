import {AdminType} from 'redux/constants/actionTypes';

// 사원등록 req, res
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

// 사원목록 req, res
export const SwpEmpSelReq = () => {
  return {
    type: AdminType.SWP_EMPSEL_REQ,
  };
};
export const SwpEmpSelRes = (emps) => {
  return {
    type: AdminType.SWP_EMPSEL_RES,
    emps
  };
};