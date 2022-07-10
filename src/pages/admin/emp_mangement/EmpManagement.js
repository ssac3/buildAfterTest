import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SwpEmpselReq} from 'redux/actions/AdminAction';
import {style} from './EmpManagementStyle';
import {cnvrtDate} from 'utils/convertDateTime';
import Pagination from 'components/Pagination';
import {DEPARTMENT_NAME_TYPE, GENDER_TYPE, POSITION_TYPE} from 'utils/constants';
import Dropbox from 'components/Dropbox';
import {MdSearch} from 'react-icons/md';
import Checkbox from 'components/Checkbox';

const ListItemComponent = ({emp, onClickDetailEmp}) => {
  return (
    <ListItemContainer>
      <Checkbox show={'auto'}/>
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
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 6;
  const [openDropbox, setOpenDropbox] = useState(false);
  const [openStatusDropbox, setOpenStatusDropbox] = useState(false);
  const [selectItem, setSelectItem] = useState({
    position:'선택하세요',
  });
  const onClickType = () => {
    setOpenDropbox(!openDropbox);
  };
  const onClickStatus = () => {
    setOpenStatusDropbox(!openStatusDropbox);
  };
  const onClickDropBoxItem = (e, target) => {
    setSelectItem({...selectItem, [target]: e.target.id});

    if(target === 'position') {
      onClickType();
    }else{
      onClickStatus();
    }
  };
  useEffect(() => {
    dispatch(SwpEmpselReq());
  }, []);
  useEffect(() => {
    if(selector.emps?.length > 0 && selector.emps[0]?.username !== undefined) {
      setEmps(selector.emps);
    } else {
      setEmps([]);
    }
  }, [selector]);
  // search
  const onClickSearch = () => {
    alert('검색');
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
                <MdSearch onClick={onClickSearch} size={25}/>
              </SchBtnContainer>
              <SchInput
                autoFocus
                // value={schVal}
                placeholder="사원번호 혹은 사원명을 입력하세요."
                // onChange={handleSchValChange}
                // data={usernameSch}
              />
            </SchContainer>
            <DivContainer>
              <SelectBox>
                <Dropbox id={'position'} open={openDropbox} onClickDropBox={onClickType} menu={POSITION_TYPE} select={selectItem.position} onClickDropBoxItem={(e) => onClickDropBoxItem(e, 'position')}/>
              </SelectBox>
            </DivContainer>
          </Wrapper>
          <DelBtn value="regBtn">삭제</DelBtn>
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
        {emps?.slice(offset, offset + 6).map((v) => {
          return <ListItemComponent
            key={v.username}
            emp={v}
            // data={usernameSch}
            onClickDetailEmp={onClickDetailEmp}
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
};
const {
  Container,
  PageNameContainer,
  TopComponent,
  Wrapper,
  SchContainer,
  SchBtnContainer,
  SchInput,
  DivContainer,
  SelectBox,
  DelBtn,
  RegBtn,
  ListHeader,
  ListItem,
  ListItemContainer,
  ItemContainer,
  BtnLayout} = style;