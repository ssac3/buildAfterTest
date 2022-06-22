import {AlertType} from 'redux/constants/actionTypes';

export const openAlert = (type, msg) => {
  return {
    open: AlertType.OPEN_ALERT,
    type,
    msg
  };
};

export const closeAlert = () => {
  return {
    open: AlertType.CLOSE_ALERT,
  };
};