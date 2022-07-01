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
        qrPath: action.qrPath
      };
    case UserType.SWP_SAPR_REQ:
      return {
        password: action.password,
        nPassword: action.nPassword,
        nPasswordCheck: action.nPasswordCheck
      };
    case UserType.SWP_SAPR_RES:
      return {};
    case UserType.SWP_DAV_REQ:
      return {};
    case UserType.SWP_DAV_RES:
      return {
        data: action.data
        // empId: action.empId,
        // aId: action.aId,
        // aStatus: action.aStatus,
        // aStartTime: action.aStartTime,
        // aEndTime: action.aEndTime,
        // rId: action.rId,
        // rStartTime: action.rStartTime,
        // rEndTime: action.rEndTime,
        // rContents: action.rrContents,
        // rApprovalFlag: action.rApprovalFlag,
        // vId: action.vId,
        // vDate: action.vDate,
        // vacationType: action.vacationType,
        // vApprovalFlag: action.rApprovalFlag,
        // vContents:action.vContents
      };
    default:
      return state;
  }
}

export default UserReducer;