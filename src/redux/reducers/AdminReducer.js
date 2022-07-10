import {AdminType} from 'redux/constants';
const INIT_STATE = {};

function AdminReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case AdminType.SWP_EMPMK_REQ:
      return {
        emps: state.emps,
      };
    case AdminType.SWP_EMPMK_RES:
      return {
        emps: state.emps,
        mkUsername: action.mkUsername
      };
    case AdminType.SWP_EMPIN_REQ:
      return {
        emp: action.emp
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
    case AdminType.SWP_EMPUP_REQ:
      return {
        change:action.change,
        username: Number(action.change.username),
        name:action.change.name,
        gender:action.change.gender,
        location:action.change.location,
        position:action.change.position,
        role:action.change.role,
        depId: action.change.depId
      };
    case AdminType.SWP_EMPUP_RES:
      return {
        change: action.change
      };
    default:
      return state;
  }
}

export default AdminReducer;