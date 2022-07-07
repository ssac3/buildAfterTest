import {UserType} from 'redux/constants/actionTypes';

export const SwpSavReq = () => {
  return {
    type: UserType.SWP_SAV_REQ
  };
};

export const SwpSavRes =
  (name, username, department, position, email, manager, location, qrPath, img) => {
    return {
      type: UserType.SWP_SAV_RES,
      name,
      username,
      department,
      position,
      email,
      manager,
      location,
      qrPath,
      img
    };
  };

export const SwpSaprReq = (password, nPassword, nPasswordCheck) => {
  return {
    type: UserType.SWP_SAPR_REQ,
    password,
    nPassword,
    nPasswordCheck
  };
};

export const SwpSaprReS = () => {
  return {
    type: UserType.SWP_SAPR_RES
  };
};

export const SwpSairReq = (data) => {
  return {
    type: UserType.SWP_SAIR_REQ,
    data
  };
};

export const SwpSairRes = () => {
  return {
    type: UserType.SWP_SAIR_RES
  };
};


export const SwpDavReq = (month) => {
  return {
    type: UserType.SWP_DAV_REQ,
    month
  };
};
export const SwpDavRes = (data) => {
  return {
    type: UserType.SWP_DAV_RES,
    data
  };
};
export const SwpVaReq = (aId, date, vacationType, contents) => {
  return {
    type: UserType.SWP_VA_REQ,
    aId,
    date,
    vacationType,
    contents
  };
};
export const SwpVaRes = () => {
  return {
    type: UserType.SWP_VA_RES
  };
};
export const SwpAarReq = (aId, startTime, endTime, contents) => {
  return {
    type: UserType.SWP_AAR_REQ,
    aId,
    startTime,
    endTime,
    contents
  };
};
export const SwpAarRes = () => {
  return {
    type:UserType.SWP_AAR_RES
  };
};
// export const SwpVaRes = () => {
//   return {
//     type: UserType.SWP_VA_RES
//   };
// };
// export const SwpVcReq = (eNum, vDate) => {
//   return {
//     type: UserType.SWP_VC_REQ,
//     eNum,
//     vDate
//   };
// };
// export const SwpVcRes = () => {
//   return {
//     type: UserType.SWP_VC_RES
//   };
// };


