import {AlertType} from 'redux/constants';

const INIT_STATE = {open: false, contents: ''};

function AlertReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case AlertType.OPEN_ALERT:
      return {
        open: true,
        type: action.type,
        contents: action.msg,
      };
    case AlertType.CLOSE_ALERT:
      return {
        open: false,
      };

    default:
      return state;
  }
}

export default AlertReducer;