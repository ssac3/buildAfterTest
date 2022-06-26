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
    default:
      return state;
  }
}

export default UserReducer;