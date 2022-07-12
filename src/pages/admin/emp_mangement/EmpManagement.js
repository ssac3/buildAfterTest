import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEmpdelReq, SwpEmpselReq} from 'redux/actions/AdminAction';
import {style} from './EmpManagementStyle';
import {cnvrtDate} from 'utils/convertDateTime';
import Pagination from 'components/Pagination';
import {DEPARTMENT_NAME_TYPE, GENDER_TYPE} from 'utils/constants';
import {MdSearch} from 'react-icons/md';
import Checkbox from 'components/Checkbox';

const ListItemComponent = ({emp, onClickDetailEmp, leave, setLeave}) => {
  const [checked, setChecked] = useState(false);
  const checkboxHandler = (target) => {
    if(leave.includes(target.toString())) {
      setLeave((prev) => prev.filter(v => v !== target.toString()));
    } else {
      setLeave((prev) => prev.concat(target.toString()));
    }
    setChecked(!checked);
  };
  useEffect(() => {
  }, [checked]);
  // 날짜 정렬함수 만들기
  return (
    <ListItemContainer>
      <Checkbox
        id={emp.username}
        show={'auto'}
        type={'checkbox'}
        checked={checked}
        onClickCk={(target) => checkboxHandler(target)}
      />
      <ItemContainer>{emp.username}</ItemContainer>
      <ItemContainer>{emp.name}</ItemContainer>
      <ItemContainer>{emp.email}</ItemContainer>
      <ItemContainer>{GENDER_TYPE[emp.gender].title}</ItemContainer>
      <ItemContainer>{DEPARTMENT_NAME_TYPE[emp.depId - 1].title}</ItemContainer>
      <ItemContainer>{emp.position}</ItemContainer>
      <ItemContainer>{cnvrtDate(new Date(emp.createdAt))}</ItemContainer>
      <ItemContainer>
        <BtnLayout onClick={() => onClickDetailEmp(emp.username)}>보기</BtnLayout>
      </ItemContainer>
    </ListItemContainer>
  );
};
export const EmpManagement = ({onClickInsertEmp, onClickDetailEmp}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.AdminReducer);
  const [emps, setEmps] = useState([]);
  const [empsCopy, setEmpsCopy] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 6;
  const [keyword, setKeyword] = useState('');
  const [leave, setLeave] = useState([]);
  useEffect(() => {
    dispatch(SwpEmpselReq());
  }, []);
  useEffect(() => {
    if(selector.emps?.length > 0 && selector.emps[0]?.username !== undefined) {
      setEmps(selector.emps);
      setEmpsCopy(selector.emps);
    } else {
      setEmps([]);
    }
  }, [selector]);
  useEffect(() => {
  }, [leave]);
  const onchangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const filterResult = (k) => {
    return emps?.filter((v) => v.username === Number(k));
  };
  // const sortDate = (a, b) => {
  //   return new Date(b.expiration_date.valueOf()) - (new Date(a.expiration_date).valueOf());
  // };
  useEffect(() => {
    if(keyword === '') {
      setEmpsCopy(emps);
    } else {
      setEmpsCopy(filterResult(keyword));
    }
  }, [keyword]);
  const onClickDeleteEmp = () => {
    dispatch(SwpEmpdelReq(leave));
  };
  return(
    <>
      <Container>
        <PageNameContainer>
          <h2>사원 관리</h2>
        </PageNameContainer>
        <TopComponent>
          <Wrapper>
            <SchContainer>
              <SchBtnContainer>
                <MdSearch size={25}/>
              </SchBtnContainer>
              <SchInput
                autoFocus
                id={'keyword'}
                value={keyword}
                placeholder={'사원번호 입력하세요.'}
                onChange={onchangeKeyword}
              />
            </SchContainer>
          </Wrapper>
          <DelBtn value="regBtn" onClick={onClickDeleteEmp}>삭제</DelBtn>
          <RegBtn value="regBtn" onClick={onClickInsertEmp}>추가</RegBtn>
        </TopComponent>
        <ListHeader>
          <Checkbox show={'hidden'}/>
          <ListItem>사원 번호</ListItem>
          <ListItem>사원명</ListItem>
          <ListItem>이메일</ListItem>
          <ListItem>성별</ListItem>
          <ListItem>부서</ListItem>
          <ListItem>직급</ListItem>
          <ListItem>입사일</ListItem>
          <ListItem>상세보기</ListItem>
        </ListHeader>
        {empsCopy?.slice(offset, offset + 6).map((v) => {
          return <ListItemComponent
            key={v.username}
            emp={v}
            onClickDetailEmp={onClickDetailEmp}
            leave={leave}
            setLeave={setLeave}
          />;
        })}
      </Container>
      <Pagination
        total={emps?.length}
        limit={6}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

EmpManagement.propTypes = {
  onClickInsertEmp:PropTypes.func.isRequired,
  onClickDetailEmp: PropTypes.func.isRequired,
};
ListItemComponent.propTypes = {
  emp: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  onClickDetailEmp: PropTypes.func.isRequired,
  leave: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number])).isRequired,
  setLeave: PropTypes.func.isRequired,
};
const {
  Container,
  PageNameContainer,
  TopComponent,
  Wrapper,
  SchContainer,
  SchBtnContainer,
  SchInput,
  DelBtn,
  RegBtn,
  ListHeader,
  ListItem,
  ListItemContainer,
  ItemContainer,
  BtnLayout} = style;