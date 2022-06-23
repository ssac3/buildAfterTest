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
    sub  : [{id: 0, title: '• 휴가 관리', check: true}, {id: 1, title: '• 근태 조정', check: false}],
    check: false
  },
  {id: 2, title: '사원별 근태 관리', sub: [], check: false},
  {id    : 3,
    title: '보고서',
    sub  : [{id: 2, title: '• 사원별 근태 현황', check: true}, {id: 3, title: '• 연장 근무 현황', check: false}],
    check: false
  }
];

export const ADMIN_MENU = [
  {id: 0, title: '사원 관리', sub: [], check: true}
];



