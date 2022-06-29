import {AdminType} from 'redux/constants';
const INIT_STATE = {};

function AdminReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case AdminType.SWP_EMPIN_REQ:
      return {
        data: action.data
      };
    case AdminType.SWP_EMPIN_RES:
      return {
      };
    default:
      return state;
  }
}

export default AdminReducer;