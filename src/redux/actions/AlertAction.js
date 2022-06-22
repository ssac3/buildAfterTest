import {AlertType} from 'redux/constants/actionTypes';

export const openAlert = (status, msg) => {
  return {
    type: AlertType.OPEN_ALERT,
    open: true,
    status,
    msg
  };
};

export const closeAlert = () => {
  return {
    type: AlertType.CLOSE_ALERT,
    open: false,
  };
};