import {ManagerType} from 'redux/constants';
const INIT_STATE = {};

function MangerReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case ManagerType.SWP_ATV_REQ:
      return {
        id: action.id,
      };
    case ManagerType.SWP_ATV_RES:
      return {
        ...state,
        name: action.name,
        startTime: action.startTime,
        endTime: action.endTime
      };
    case ManagerType.SWP_ATR_REQ:
      return {
        id: action.id,
        startTime: action.startTime,
        endTime: action.endTime
      };
    case ManagerType.SWP_ATR_RES:
      return {
      };
    case ManagerType.SWP_VAV_REQ:
      return {
        ...state,
      };
    case ManagerType.SWP_VAV_RES:
      return {
        ...state,
        data: action.data
      };
    case ManagerType.SWP_VAR_REQ:
      return {
        vId: action.vId,
        approvalFlag: action.approvalFlag
      };
    default:
      return state;
  }
}

export default MangerReducer;