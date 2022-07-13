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

export const openToast = (name) => {
  return {
    type: AlertType.OPEN_TOAST,
    open: true,
    name
  };
};

export const closeToast = () => {
  return {
    type: AlertType.CLOSE_TOAST,
    open: false,
  };
};
