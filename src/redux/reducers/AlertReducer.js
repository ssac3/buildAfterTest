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
        history: action.history,
      };
    case AlertType.CLOSE_ALERT:
      console.log(state);
      return {
        type: action.type,
        open: false,
        history: state.history,
      };

    default:
      return state;
  }
}

export default AlertReducer;