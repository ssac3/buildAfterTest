import storage from './storage';
export const LOCAL_STORAGE = storage(localStorage);
export const API = {
  ROOT:'/',
  ADMIN:'/admin',
  MANAGER: '/manager',
  USER: '/user',
  LOGIN: '/login'
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
  SWP_SAV_REQ: API.USER.concat('/myView'),
  SWP_DAV_REQ: API.USER.concat('/getAllAttendance'),
  SWP_EAC_REQ: API.LOGIN.concat(''),
  SWP_EMPIN_REQ: API.ADMIN.concat('/insertEmp'),
  SWP_SAPR_REQ: API.USER.concat('/updatePw')
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

export const MANAGER_ATD_MNG_HEADER = [
  {id: 0, title:'사원번호'},
  {id :1, title:'사원명'},
  {id: 2, title: '조정 요청 일자'},
  {id: 3, title: '조정 요청 사유'},
  {id: 4, title: '조정 요청 시간'},
  {id: 5, title: '실제 출/퇴근 시간'},
  {id: 6, title: '상태'},
  {id: 7, title: '수정'},
];


export const MANAGER_EMP_MNG_HEADER = [
  {id: 0, title:'사원번호'},
  {id :1, title:'사원명'},
  {id: 2, title: '이메일'},
  {id: 3, title: '성별'},
  {id: 4, title: '부서'},
  {id: 5, title: '직급'},
  {id: 6, title: '입사일'},
  {id: 7, title: '상세보기'},
];


