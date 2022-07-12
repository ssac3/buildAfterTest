import {SignInType, SignOutType} from 'redux/constants';
const INIT_STATE = {};

function SignInReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case SignInType.SWP_EAC_REQ:
      return {
        username: action.username,
        password: action.password,
        history: action.history
      };
    case SignInType.SWP_EAC_RES:
      return {
        data: action.data
      };
    case SignOutType.SWP_EAS_REQ:
      return {
        history: action.history
      };
    case SignOutType.SWP_EAS_RES:
      return {};
    case SignInType.SWP_DLR_REQ:
      return {
        data: action.data
      };
    case SignInType.SWP_DLR_RES:
      return {
        data: action
      };
    default:
      return state;
  }
}

export default SignInReducer;