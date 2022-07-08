import {ScannerType} from 'redux/constants/actionTypes';


export const SwpQcsReq = (username) => {
  return {
    type: ScannerType.SWP_QCS_REQ,
    username
  };
};

export const SwpQcsRes = () => {
  return {
    type: ScannerType.SWP_QCS_RES
  };
};



