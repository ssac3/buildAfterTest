import {UserType} from 'redux/constants/actionTypes';

export const SwpSavReq = (id) => {
  return {
    type: UserType.SWP_SAV_REQ,
    id
  };
};

export const SwpSavRes = (name, department, position, email, manager, location, qrPath) => {
  return {
    type: UserType.SWP_SAV_REQ,
    name,
    department,
    position,
    email,
    manager,
    location,
    qrPath
  };
};

