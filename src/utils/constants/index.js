import storage from './storage';
export const LOCAL_STORAGE = storage(localStorage);
export const API = {
  ROOT:'/',
  ADMIN:'/admin',
  MANAGER: '/manager',
  USER: '/user',
  LOGIN: '/login',
  LOGOUT: '/logout'
};


export const ROUTES = {
  CLIENT_URL: 'http://localhost:3000/',
  BASE_URL: 'http://localhost:8081',
  SWP_ATV_REQ: API.MANAGER.concat('/deptView'),
  SWP_ATR_REQ: API.MANAGER.concat('/deptUpdate'),
  SWP_VAV_REQ: API.MANAGER.concat('/vacView'),
  SWP_VAR_REQ: API.MANAGER.concat('/vacUpdate'),
  SWP_RAV_REQ: API.MANAGER.concat('/rarView'),
  SWP_RAR_REQ: API.MANAGER.concat('/rarUpdate'),
  SWP_EIV_REQ: API.MANAGER.concat('/eivView'),
  SWP_EAD_REQ: API.MANAGER.concat('/eadView'),
  SWP_EAM_REQ: API.MANAGER.concat('/eamView'),
  SWP_SAV_REQ: API.USER.concat('/myView'),
  SWP_DAV_REQ: API.USER.concat('/getAllAttendance'),
  SWP_EAC_REQ: API.LOGIN.concat(''),
  SWP_EMPIN_REQ: API.ADMIN.concat('/insertEmp'),
  SWP_EMPSEL_REQ: API.ADMIN.concat(''),
  SWP_EMPUP_REQ: API.ADMIN.concat('/updateEmp'),
  SWP_SAPR_REQ: API.USER.concat('/updatePw'),
  SWP_EAS_REQ: API.LOGOUT.concat(''),
  SWP_SAIR_REQ: API.USER.concat('/myImgUpdate')
};

export const LOG = (target) => {
  return {
    SUCCESS: `[LOG] ${target} 통신 성공`,
    ERROR:  `[LOG] ${target} 통신 에러`
  };
};


export const USER_MENU = [
  {
    id   : 0,
    title: '근태 관리',
    sub  : [{id: 0, title: '• 일별', check: true}, {id: 1, title: '• 월별', check: false}],
    check: true
  },
  {
    id   : 1,
    title: '개인 정보 관리',
    sub  : [{id: 2, title: '• 개인 정보', check: true}, {id: 3, title: '• 비밀번호 관리', check: false}],
    check: false
  },
];

export const MANAGER_MENU = [
  {id: 0, title: '대시보드', sub: [], check: true},
  {
    id   : 1,
    title: '근태 신청 관리',
    sub  : [{id: 2, title: '• 휴가 관리', check: true}, {id: 3, title: '• 근태 조정', check: false}],
    check: false
  },
  {id: 4, title: '사원별 근태 관리', sub: [], check: false},
  {id    : 5,
    title: '보고서',
    sub  : [{id: 6, title: '• 사원별 근태 현황', check: true}, {id: 7, title: '• 연장 근무 현황', check: false}],
    check: false
  }
];

export const ADMIN_MENU = [
  {id: 0, title: '사원 관리', sub: [], check: true}
];
export const POSITION_TYPE = [
  {id: 0, title: '인턴'},
  {id: 1, title: '사원'},
  {id: 2, title: '주임'},
  {id: 3, title: '대리'},
  {id: 4, title: '과장'},
  {id: 5, title: '차장'},
  {id: 6, title: '부장'},
];
export const LOCATION_TYPE = [
  {id: 1, title: '강촌'},
  {id: 2, title: '부산'},
  {id: 3, title: '서울'}
];
export const ROLE_TYPE = [
  {id: 0, title: '관리자'},
  {id: 1, title: '매니저'},
  {id: 2, title: '일반사원'},
];
export const ATTENDENCE_MANAGER_TYPE = [
  {id: 0, title: '박채연'},
  {id: 1, title: '하성록'}
];
// 부서 depId, depName
export const DEPARTMENT_NAME_TYPE = [
  {id: 1, title: '개발1팀'},
  {id: 2, title: '영업1팀'},
  {id: 3, title: '개발2팀'},
];

export const VACATION_TYPE = [
  {id: 0, title: '전일'},
  {id: 1, title: '오전'},
  {id: 2, title: '오후'},
];


export const MANAGER_APPROVAL_TYPE = [
  {id: 0, title: '요청'},
  {id: 1, title: '승인'},
  {id: 2, title: '반려'},
];

export const GENDER_TYPE = [
  {id:0, title:'남'},
  {id:1, title:'여'}
];

