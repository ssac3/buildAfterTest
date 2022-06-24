import storage from './storage';
export const LOCAL_STORAGE = storage(localStorage);
const API = {
  ADMIN:'/admin',
  MANAGER: '/manager',
  USER: '/user'
};


export const ROUTES = {
  CLIENT_URL: 'http://localhost:3000/',
  BASE_URL: 'http://localhost:8081',
  SWP_ATV_REQ: API.MANAGER.concat('/deptView'),
  SWP_ATR_REQ: API.MANAGER.concat('/deptUpdate'),
  SWP_VAV_REQ: API.MANAGER.concat('/vacView'),
  SWP_VAR_REQ: API.MANAGER.concat('/vacUpdate')
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
