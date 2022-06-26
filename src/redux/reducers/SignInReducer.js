import {SignInType} from 'redux/constants';
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
    default:
      return state;
  }
}

export default SignInReducer;