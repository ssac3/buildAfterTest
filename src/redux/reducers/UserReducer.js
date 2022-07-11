import {UserType} from 'redux/constants';
const INIT_STATE = {};

function UserReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case UserType.SWP_SAV_REQ:
      return {};
    case UserType.SWP_SAV_RES:
      return {
        name: action.name,
        username: action.username,
        department: action.department,
        position: action.position,
        email: action.email,
        manager: action.manager,
        location: action.location,
        qrPath: action.qrPath,
        img: action.img
      };
    case UserType.SWP_SAPR_REQ:
      return {
        password: action.password,
        nPassword: action.nPassword,
        nPasswordCheck: action.nPasswordCheck
      };
    case UserType.SWP_SAPR_RES:
      return {};
    case UserType.SWP_SAIR_REQ:
      return {
        data: action.data
      };
    case UserType.SWP_SAIR_RES:
      return {};
    case UserType.SWP_DAV_REQ:
      return {
        month: action.month,
      };
    case UserType.SWP_DAV_RES:
      return {
        month: state.month,
        data: action.data
      };
    case UserType.SWP_VA_REQ:
      return {
        aId: action.aId,
        date: action.date,
        vacationType: action.vacationType,
        contents: action.contents
      };
    case UserType.SWP_VA_RES:
      return {};
    case UserType.SWP_AAR_REQ:
      return {
        aId: action.aId,
        startTime: action.startTime,
        endTime: action.endTime,
        contents: action.contents
      };
    case UserType.SWP_AAR_RES:
      return {
      };
    case UserType.SWP_VC_REQ:
      return {
        id: action.id,
        date: action.date,
        month: state.month,
      };
    case UserType.SWP_VC_RES:
      return {
        month: state.date.substring(0, 7),
      };
    case UserType.SWP_UAG_REQ:
      return {
        date: action.date
      };
    case UserType.SWP_UAG_RES:
      return {
        data: action.data,
      };
    default:
      return state;
  }
}

export default UserReducer;