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

export const SwpDavReq = () => {
  return {
    type: UserType.SWP_DAV_REQ
  };
};
export const SwpDavRes = (data) => {
  return {
    type: UserType.SWP_DAV_RES,
    data
  };
};
// export const SwpVaReq = (eNum, vDate, vacationType, vContents) => {
//   return {
//     type: UserType.SWP_VA_REQ,
//     eNum,
//     vDate,
//     vacationType,
//     vContents
//   };
// };
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
// export const SwpAarReq = () => {
//   return {
//     type: UserType.SWP_AAR_REQ
//   };
// };
// export const SwpAarRes = () => {
//   return {
//     type:UserType.SWP_AAR_RES
//   };
// };

