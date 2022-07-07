import {ScannerType} from 'redux/constants';
const INIT_STATE = {};

function ScannerReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case ScannerType.SWP_QCS_REQ:
      return {
        username: action.username
      };
    case ScannerType.SWP_QCS_RES:
      return {};
    default:
      return state;
  }
}

export default ScannerReducer;