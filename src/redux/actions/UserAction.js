import {UserType} from 'redux/constants/actionTypes';

export const SwpSavReq = () => {
  return {
    type: UserType.SWP_SAV_REQ
  };
};

export const SwpSavRes =
  (name, username, department, position, email, manager, location, qrPath) => {
    return {
      type: UserType.SWP_SAV_RES,
      name,
      username,
      department,
      position,
      email,
      manager,
      location,
      qrPath
    };
  };

