import {ManagerType} from 'redux/constants';
const INIT_STATE = {};

function MangerReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case ManagerType.SWP_ATV_REQ:
      return {
        ...state,
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
        name: state.name,
        id: action.id,
        startTime: action.startTime,
        endTime: action.endTime,
        data:state.data,
      };
    case ManagerType.SWP_ATR_RES:
      return {
        ...state,
      };
    case ManagerType.SWP_VAV_REQ:
      return {
        name:state.name,
        startTime:state.startTime,
        endTime:state.endTime,
      };
    case ManagerType.SWP_VAV_RES:
      return {
        name: state.name,
        startTime: state.startTime,
        endTime: state.endTime,
        data: action.data
      };
    case ManagerType.SWP_VAR_REQ:
      return {
        name: state.name,
        startTime: state.startTime,
        endTime: state.endTime,
        vId: action.vId,
        approvalFlag: action.approvalFlag,
        detailInit: action.detailInit
      };
    case ManagerType.SWP_RAV_REQ:
      return {
        name: state.name,
        startTime: state.startTime,
        endTime: state.endTime
      };
    case ManagerType.SWP_RAV_RES:
      return {
        name: state.name,
        startTime: state.startTime,
        endTime: state.endTime,
        data: action.data,
      };
    case ManagerType.SWP_RAR_REQ:
      return {
        name: state.name,
        startTime: state.startTime,
        endTime: state.endTime,
        data: action.data,
        closePage: action.closePage
      };
    default:
      return state;
  }
}

export default MangerReducer;