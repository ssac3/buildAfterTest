import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Search from 'components/EmpListHeader';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEmpSelReq} from 'redux/actions/AdminAction';
import {style} from './EmpManagementStyle';
import {cnvrtDate} from 'utils/convertDateTime';

const ListItemComponent = ({emp}) => {
  return (
    <ListItemContainer>
      <ItemContainer >{emp.username}</ItemContainer>
      <ItemContainer>{emp.name}</ItemContainer>
      <ItemContainer>{emp.email}</ItemContainer>
      <ItemContainer>{emp.gender}</ItemContainer>
      <ItemContainer>{emp.depId}</ItemContainer>
      <ItemContainer >{emp.position}</ItemContainer>
      <ItemContainer >{cnvrtDate(new Date(emp.createdAt))}</ItemContainer>
      <ItemContainer >
        <BtnLayout >보기</BtnLayout>
      </ItemContainer>
    </ListItemContainer>
  );
};

export const EmpManagement = ({onClickInsertEmp}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.AdminReducer);
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    dispatch(SwpEmpSelReq());
  }, []);

  useEffect(() => {
    console.log(selector);
    if(selector.emps?.length > 0 && selector.emps[0]?.username !== undefined) {
      setEmps(selector.emps);
    } else {
      setEmps([]);
    }
  }, [selector]);
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
              <option key="a" value="a">사원</option>
              <option key="b" value="b">주임</option>
              <option key="c" value="c">대리</option>
              <option key="d" value="d">과장</option>
              <option key="e" value="e">차장</option>
              <option key="f" value="f">부장</option>
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
        {emps?.map((v) => {
          console.log(v);
          return <ListItemComponent key={v.username} emp={v}/>;
        })}
      </Container>
    </>
  );
};

EmpManagement.propTypes = {
  onClickInsertEmp:PropTypes.func.isRequired,
};
ListItemComponent.propTypes = {
  emp: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
  ).isRequired,
};
const {
  Container,
  DelBtn,
  RegBtn,
  ListHeader,
  ListItem,
  ListItemContainer,
  ItemContainer,
  BtnLayout} = style;