import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Search from 'components/EmpListHeader';
import {EmpList} from 'components/EmpList/EmpList';
import {style} from './EmpManagementStyle';
export const EmpManagement = ({onClickInsertEmp}) => {
  // setEmps해주기 쓰려면~db연결해서 할 땐 빈값으로 만들어주기
  const [emps] = useState([
    {
      id: '',
      checked: '',
      username: '',
      name: '',
      email: '',
      img: '',
      gender: '',
      department_id: '',
      deptname: '',
      department_location: '',
      position: '',
      role: '',
      qr_path: '',
      createAt: '',
      working_status: '',
    },
    {
      id: '',
      checked: '',
      username: '',
      name: '',
      email: '',
      img: '',
      gender: '',
      department_id: '',
      deptname: '',
      department_location: '',
      position: '',
      role: '',
      qr_path: '',
      createAt: '',
      working_status: '',
    },
  ]);
  return(
    <>
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
          <RegBtn value="regBtn" onClick={onClickInsertEmp}>추가</RegBtn>
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
    </>
  );
};

EmpManagement.propTypes = {
  onClickInsertEmp:PropTypes.func.isRequired,
};
const {Container, DelBtn, RegBtn, ListHeader, ListItem} = style;