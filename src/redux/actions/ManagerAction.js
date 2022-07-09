import {ManagerType} from 'redux/constants/actionTypes';

export const SwpAtvReq = (id) => {
  return {
    type: ManagerType.SWP_ATV_REQ,
    id
  };
};

export const SwpAtvRes = (name, startTime, endTime) => {
  return {
    type: ManagerType.SWP_ATV_RES,
    name,
    startTime,
    endTime,
  };
};

export const SwpAtrReq = (id, startTime, endTime) => {
  return {
    type: ManagerType.SWP_ATR_REQ,
    id,
    startTime,
    endTime
  };
};

export const SwpAtrRes = () => {
  return {
    type: ManagerType.SWP_ATR_RES
  };
};

export const SwpVavReq = (id) => {
  return {
    type: ManagerType.SWP_VAV_REQ,
    id,
  };
};

export const SwpVavRes = (data) => {
  return {
    type: ManagerType.SWP_VAV_RES,
    data,
  };
};

export const SwpVarReq = (vId, approvalFlag, detailInit) => {
  return {
    type: ManagerType.SWP_VAR_REQ,
    vId,
    approvalFlag,
    detailInit
  };
};

export const SwpRavReq = (id) => {
  return {
    type: ManagerType.SWP_RAV_REQ,
    id
  };
};

export const SwpRavRes = (data) => {
  return {
    type: ManagerType.SWP_RAV_RES,
    data
  };
};

export const SwpRarReq = (data, closePage) => {
  return {
    type: ManagerType.SWP_RAR_REQ,
    data,
    closePage
  };
};

export const SwpEivReq = (id) => {
  return {
    type: ManagerType.SWP_EIV_REQ,
    id,
  };
};

export const SwpEivRes = (data) => {
  return {
    type: ManagerType.SWP_EIV_RES,
    data
  };
};

export const SwpEadReq = (username, findDate) => {
  return {
    type: ManagerType.SWP_EAD_REQ,
    username,
    findDate,
  };
};

export const SwpEadRes = (data) => {
  return {
    type: ManagerType.SWP_EAD_RES,
    data
  };
};

export const SwpEamReq = (username, year) => {
  return {
    type: ManagerType.SWP_EAM_REQ,
    username,
    year
  };
};

export const SwpEamRes = (data) => {
  return {
    type: ManagerType.SWP_EAM_RES,
    data
  };
};

export const SwpEavReq = (username, findDate) => {
  return {
    type: ManagerType.SWP_EAV_REQ,
    username,
    findDate
  };
};

export const SwpEavRes = (data) => {
  return {
    type: ManagerType.SWP_EAV_RES,
    data
  };
};

export const SwpEovReq = (depId, findDate) => {
  return {
    type: ManagerType.SWP_EOV_REQ,
    depId,
    findDate
  };
};

export const SwpEovRes = (data) => {
  return {
    type: ManagerType.SWP_EOV_RES,
    data
  };
};