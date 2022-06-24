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
    endTime
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

export const SwpVavReq = () => {
  return {
    type: ManagerType.SWP_VAV_REQ,
  };
};

export const SwpVavRes = (data) => {
  console.log(data);
  return {
    type: ManagerType.SWP_VAV_RES,
    data,
  };
};