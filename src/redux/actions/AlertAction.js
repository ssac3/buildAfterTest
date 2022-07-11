import {AlertType} from 'redux/constants/actionTypes';

export const openAlert = (status, msg, history) => {
  return {
    type: AlertType.OPEN_ALERT,
    open: true,
    status,
    msg,
    history
  };
};

export const closeAlert = () => {
  return {
    type: AlertType.CLOSE_ALERT,
    open: false,
  };
};