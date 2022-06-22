import React, {useState} from 'react';
import Search from 'components/EmpListHeader';
import {EmpList} from '../../../components/EmpList/EmpList';
import {style} from './EmpManagementStyle';

export const EmpManagement = () => {
  // setEmps해주기 쓰려면~
  const [emps] = useState([
    {
      checked: true,
      username: '123456',
      name: 'kimyunji',
      img: 'qwerqwerqwer',
      gender: '0',
      department_id: 1,
      department_name: 'develop',
      department_location: 'busan',
      position: 'team leader',
      role: '0',
      qr_path: 'asdfasdfasdf',
      create_at: '2022.06.22',
      working_status: '0',



    },
    {
      id: 2,
      text: '박채연',
      checked: true,
    },
    {
      id: 3,
      text: '하성록',
      checked: false,
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
            <option key="email" value="email">이메일</option>
            <option key="deptname" value="deptname">부서</option>
            <option key="createat" value="createat">입사일</option>
          </select>
        </div>
        <BtnLayout value="regBtn">추가</BtnLayout>
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
const {Container, BtnLayout, ListHeader, ListItem} = style;