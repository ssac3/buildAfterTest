import {AlertType} from 'redux/constants';

const INIT_STATE = {};

function AlertReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case AlertType.OPEN_ALERT:
      return {
        type: action.type,
        open: true,
        status: action.status,
        msg: action.msg,
      };
    case AlertType.CLOSE_ALERT:
      return {
        type: action.type,
        open: false,
      };
    case AlertType.OPEN_TOAST:
      return {
        type: action.type,
        show: true,
        name: action.name,
      };
    case AlertType.CLOSE_TOAST:
      return {
        type: action.type,
        show: false
      };
    default:
      return state;
  }
}

export default AlertReducer;