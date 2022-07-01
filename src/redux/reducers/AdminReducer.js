import {AdminType} from 'redux/constants';
const INIT_STATE = {};

function AdminReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case AdminType.SWP_EMPIN_REQ:
      return {
        username: Number(action.emp.username),
        name: action.emp.name,
        email: action.emp.email,
        gender: action.emp.gender,
        location: action.emp.location,
        position: action.emp.position,
        role: action.emp.role,
        qrPath: action.emp.qrPath,
        depId: action.emp.depId,
        password: action.emp.password,
        img:action.emp.img
      };
    case AdminType.SWP_EMPIN_RES:
      return {};
    case AdminType.SWP_EMPSEL_REQ:
      return {};
    case AdminType.SWP_EMPSEL_RES:
      return{
        emps: action.emps,
        emp: action.emp
      };
    default:
      return state;
  }
}

export default AdminReducer;