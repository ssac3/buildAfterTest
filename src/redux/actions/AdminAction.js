import {AdminType} from 'redux/constants/actionTypes';
// 사번생성
export const SwpEmpmkReq = () => {
  return {
    type: AdminType.SWP_EMPMK_REQ,
  };
};
export const SwpEmpmkRes = (mkUsername) => {
  return {
    type: AdminType.SWP_EMPMK_RES,
    mkUsername,
  };
};

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
export const SwpEmpupReq = (change) => {
  return {
    type: AdminType.SWP_EMPUP_REQ,
    change
  };
};
export const SwpEmpupRes = (change) => {
  return {
    type: AdminType.SWP_EMPUP_RES,
    change
  };
};
// 사원 삭제
export const SwpEmpdelReq = (leave) => {
  return {
    type: AdminType.SWP_EMPDEL_REQ,
    leave
  };
};