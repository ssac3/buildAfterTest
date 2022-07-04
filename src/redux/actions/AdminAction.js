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

// 사원목록, 사원정보 req, res
export const SwpEmpselReq = () => {
  return {
    type: AdminType.SWP_EMPSEL_REQ,
  };
};
export const SwpEmpselRes = (emps) => {
  return {
    type: AdminType.SWP_EMPSEL_RES,
    emps
  };
};

// 사원수정
export const SwpEmpupReq = (emp) => {
  return {
    type: AdminType.SWP_EMPUP_REQ,
    emp
  };
};
export const SwpEmpupRes = (emp) => {
  return {
    type: AdminType.SWP_EMPUP_RES,
    emp
  };
};