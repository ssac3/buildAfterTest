import React, {useState} from 'react';
import Search from 'components/EmpListHeader';
import {EmpList} from '../../../components/EmpList/EmpList';
import {style} from './EmpManagementStyle';

export const EmpManagement = () => {
  // setEmps해주기 쓰려면~db연결해서 할 땐 빈값으로 만들어주기
  const [emps] = useState([
    {
      id: 1,
      checked: true,
      username: '123456',
      name: '김윤지',
      email: 'qwer@qwer.com',
      img: 'qwerqwerqwer',
      gender: '여',
      department_id: 1,
      deptname: '개발부',
      department_location: 'busan',
      position: '팀장',
      role: '0',
      qr_path: 'asdfasdfasdf',
      createAt: '2022.06.22',
      working_status: '0',
    },
    {
      id: 2,
      checked: true,
      username: '789456',
      name: '홍길동',
      email: 'asdf@asdf.com',
      img: 'qwerqwerqwer',
      gender: '남',
      department_id: 1,
      deptname: '인사',
      department_location: 'busan',
      position: '사원',
      role: '0',
      qr_path: 'asdfasdfasdf',
      createAt: '2022.06.32',
      working_status: '0',
    },
  ]);
  return(
    <Container>
      <div id="pagename">
        <h2>사원 관리</h2>
      </div>
      <div id="topcomponent">
        <div id={'wrapper'}>
          <Search/>
          <select id="selectbox">
            <option key="position" value="position">직급</option>
            <option key="email" value="email">사원</option>
            <option key="deptname" value="deptname">주임</option>
            <option key="createat" value="createat">대리</option>
            <option key="createat" value="createat">과장</option>
            <option key="createat" value="createat">차장</option>
            <option key="createat" value="createat">부장</option>
          </select>
        </div>
        <DelBtn value="regBtn">삭제</DelBtn>
        <RegBtn value="regBtn">추가</RegBtn>
      </div>
      <ListHeader>
        <ListItem w={100}>사원 번호</ListItem>
        <ListItem w={100}>사원명</ListItem>
        <ListItem w={150}>이메일</ListItem>
        <ListItem w={100}>성별</ListItem>
        <ListItem w={100}>부서</ListItem>
        <ListItem w={100}>직급</ListItem>
        <ListItem w={100}>입사일</ListItem>
        <ListItem w={100}>상세보기</ListItem>
      </ListHeader>
      <EmpList emps={emps}/>
    </Container>
  );
};
const {Container, DelBtn, RegBtn, ListHeader, ListItem} = style;